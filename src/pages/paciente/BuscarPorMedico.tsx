import { useEffect, useState } from "react";
import { useUserContext } from "../../context/authContext";
import {
  fetchMedicos,
  fetchTurnosDisponiblesByMedico,
  fetchCrearTurnos,
} from "../../services/apiService";
import { IMedicoResponse } from "../../types/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import List from "../../Components/Lists/List/List";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import Calendario from "../../Components/turno/Calendar/Calendar";
import { getDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import SeleccionarHorario from "../../Components/turno/SeleccionarHorario/SeleccionarHorario";
import { ITurnoCreateRequestDTO } from "../../types/turno/TurnoCreateRequest.DTO.type";
import GetJwtContent from "../../utils/jwtUtils";
import useMedicos from "../../hooks/UseMedicos";
import useTurnos from "../../hooks/UseTurnos";
import ListOpening from "../../Components/Lists/ListOpening/ListOpening";
import ListMedicos from "../../Components/Lists/listMedicos/ListMedicos";

function BuscarPorMedico() {
  const user = useUserContext();
  const [error, setError] = useState<ErrorTypeAny>(null);
  const [componenteActivo, setComponenteActivo] = useState<string>("1"); // 'componente1', 'componente2', 'componente3'
  const [especialidad, setEspecialidad] = useState<string[]>([]);

  const [showTurnosDisponibles, setShowTurnosDisponibles] =
    useState<TurnoHorarioDisponibleResponseDTO>();
  const [nombreMedicoSelect, setNombreMedicoSelect] = useState<string>();
  const [dateTurnosDisponibles, setDateTurnosDisponibles] = useState<Date[]>();
  const [createTurnoRequest, setCreateTurnoRequest] =
    useState<ITurnoCreateRequestDTO>({
      MedicoId: 0,
      PacienteId: 0,
      Fecha: "",
    });

  const navigate = useNavigate();

  /*
    0- getMedicos trae un listado con todos los medicos
    2- al seleccionar el medico hace un pedido a getTurnosDisponiblesByMedico y trae sus turnos disponibles  
    2-  se activa useffect[turnosDisponibles] y llama a filtrarTurnos (se puede psar a componente filtrarTurnos)
    3- filtrarTurnos indica los dias disponibles que el medico puede tomar turnos
    4- handleDiaSelect busca  los horarios disponibles para la fecha seleccionada // checkiar si hace falta convertirlo
    5 - se activa useffect[showTurnosDisponibles], muestra el listado de horarios
    6 - handleHorarioSelect -> llama al hook para crear un turno
  */

  const { medicos, getMedicos, medicosError } = useMedicos();
  const {
    getTurnosDisponiblesByMedico,
    crearTurno,
    errorTurno,
    turnosDisponibles,
  } = useTurnos();

  // Manejador centralizado de errores
  useEffect(() => {
    if (medicosError) {
      setError(medicosError);
    } else if (errorTurno) {
      setError(errorTurno);
    } else {
      setError(null);
    }
  }, [medicosError, errorTurno]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getMedicos();
    }
  }, []);

  useEffect(() => {
    filtrarTurnos();
  }, [turnosDisponibles]);

  function filtrarTurnos() {
    var filterTurnosDisponibles = turnosDisponibles?.map((elem) => elem.fecha);
    if (filterTurnosDisponibles) {
      setDateTurnosDisponibles(filterTurnosDisponibles);
    }
  }
  
  function showDiasDisponibles(e: number) {

    getTurnosDisponiblesByMedico(e.toString());
    var nombreMedico = medicos?.find((elem) => elem.id === e);
    setNombreMedicoSelect(nombreMedico?.nombre + " " + nombreMedico?.apellido);
    setCreateTurnoRequest((prevState) => ({ ...prevState, MedicoId: e }));
    setComponenteActivo("2");
  }

  function handleDiaSelect(e: string) {

    if (typeof e == "string") {
      var selectHorarios = turnosDisponibles?.find(
        (elem) => getDate(elem.fecha.toString()) == getDate(e)
      );
      setShowTurnosDisponibles(selectHorarios);
    }
  }

  //al seleccionar una fecha en el calendario llama aca
  useEffect(() => {
    if (showTurnosDisponibles) {
      setComponenteActivo("3");
    }
  }, [showTurnosDisponibles]);

  function handleHorarioSelect(horario: string) {
    console.log(horario + " " + nombreMedicoSelect);
    var params: any = GetJwtContent(user);
    var pacienteId: number = Number(params.PersonaId);
    setCreateTurnoRequest((prevState) => ({
      ...prevState,
      Fecha: horario,
      PacienteId: pacienteId,
    }));

    setComponenteActivo("1");
  }
  useEffect(() => {
    if (
      createTurnoRequest.MedicoId != 0 &&
      createTurnoRequest.PacienteId != 0
    ) {
      console.log(createTurnoRequest);
      crearTurno(createTurnoRequest);

      //evita que la funcion sea llamada veces extra, reinicia las variables una vez que el turno fue creado
      setCreateTurnoRequest((prevState) => ({
        ...prevState,
        MedicoId: 0,
        PacienteId: 0,
      }));
    }
  }, [createTurnoRequest]);

  //objete medicos filtrado, solo con los datos necesarios
  const filterMedicos =
    medicos?.map((medico) => {
      return { nombre: medico.nombre + " " + medico.apellido, id: medico.id };
    }) || [];

  return (
    <div
     
    >
      {componenteActivo == "1" && medicos && (
  
          <ListMedicos listMedicos={medicos} handleSelect={showDiasDisponibles}/>
        //<ListOpening title="Seleccionar Medico" listItems={filterMedicos} handleSelect={showDiasDisponibles}/>
        
      )}
      {componenteActivo == "2" && (
        <>
          <Calendario
            dateList={dateTurnosDisponibles}
            handleSelect={handleDiaSelect}
          />
        </>
      )}
      {componenteActivo == "3" && (
        <>
          {showTurnosDisponibles && (
            <SeleccionarHorario
              showTurnosDisponibles={showTurnosDisponibles}
              handleHorarioSelect={handleHorarioSelect}
              nombreMedico={nombreMedicoSelect}
            />
          )}
        </>
      )}
      <div>{error && <p className="text-danger">{error}</p>}</div>
    </div>
  );
}

export default BuscarPorMedico;
