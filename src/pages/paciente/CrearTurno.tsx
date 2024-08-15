import { useEffect, useState } from "react";
import { usePersonaInfoContext, useUserContext } from "../../context/authContext";

import { IMedicoResponse } from "../../types/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { getDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { ITurnoCreateRequestDTO } from "../../types/turno/TurnoCreateRequest.DTO.type";
import GetJwtContent from "../../utils/jwtUtils";
import useMedicos from "../../hooks/UseMedicos";
import useTurnos from "../../hooks/turnos/UseTurnos";
import ListMedicos from "../../Components/turnos/listMedicos/ListMedicos";
import CalendarioTurnoDisponible from "../../Components/turnos/calendarioTurnoDisponible/CalendarioTurnoDisponible";
import ListEspecialidades from "../../Components/turnos/listEspecialdiad/ListEspecialidad";
import ListHorariosPorMedico from "../../Components/turnos/listHorariosPorMedico/ListHorariosPorMedico";
import CreatTurnoModal from "../../Components/modals/CreateTurnoModal";
import useCreateTurnoModal from "../../hooks/useModal";
import { stringify } from "querystring";
import Opening from "../../Components/General/Opening/Opening";
import { title } from "process";
import { createUnparsedSourceFile } from "typescript";



interface ICrearTurno {
  filterBy?: string; // Hacer que filterBy sea opcional
}

function CrearTurno({filterBy = "1"}:ICrearTurno) {
  const user = useUserContext();
  const [error, setError] = useState<ErrorTypeAny>(null);
  const [componenteActivo, setComponenteActivo] = useState<string>(filterBy); // 'componente1', 'componente2', 'componente3'
  const [showTurnosDisponibles, setShowTurnosDisponiblesHorarios] =
    useState<TurnoHorarioDisponibleResponseDTO[]>();
  const [medicoSelect, setMedicoSelect] = useState<IMedicoResponse>();
  const [createTurnoRequest, setCreateTurnoRequest] =
    useState<ITurnoCreateRequestDTO>({
      MedicoId: 0,
      PacienteId: 0,
      Fecha: "",
    });
    const [titleOening,setTitleOening] = useState <string>("");
    const [subtitleOening,setSubtitleOening] = useState <string>("")

    // <Opening title="Seleccionar Fecha Disponible" customOpen="miniOpening"/>

     useEffect(()=>{
      setSubtitleOening("");
      switch (componenteActivo){
        case "0":
            setTitleOening("Seleccionar Medico");
            break;
        case "1":
          setTitleOening("Seleccionar Especialidad");
          break;
        
          case "2":
            setTitleOening("Seleccionar Fecha");
    
            break;
            case "3":
              setTitleOening("Seleccionar Horario");
              var str = getDate(
                showTurnosDisponibles ? showTurnosDisponibles[0]?.fecha.toString() : ""
              );
              setSubtitleOening("Fecha: " + str);
              break;
      }
    },[componenteActivo])

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

  const { medicos, getMedicos, medicosError, findMedicoById, medicoNombre } =
    useMedicos();
  const {
    getTurnosDisponiblesByMedico,
    crearTurno,
    errorTurno,
    turnosDisponibles,
    getTurnosDisponiblesByEspecialidad,
  } = useTurnos();
  const { showCreatTurnoModal, closeCreatTurnoModal, toggleCreateModal } =
    useCreateTurnoModal();

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

  function showDiasDisponibles(e: number) {
    getTurnosDisponiblesByMedico(e.toString());
    var nombreMedico = medicos?.find((elem) => elem.id === e);
    //setMedicoSelect(nombreMedico?.nombre + " " + nombreMedico?.apellido);
    //setCreateTurnoRequest((prevState) => ({ ...prevState, MedicoId: e }));
    setComponenteActivo("2");
  }

  function handleDiaSelect(e: string) {
    if (typeof e == "string") {
      var selectHorarios = turnosDisponibles?.filter(
        (elem) => getDate(elem.fecha.toString()) == getDate(e)
      );
      setShowTurnosDisponiblesHorarios(selectHorarios);
    }
  }

  //al seleccionar una fecha en el calendario llama aca - viene de handleDiaSelect
  useEffect(() => {
    if (showTurnosDisponibles) {
      setComponenteActivo("3");
    }
  }, [showTurnosDisponibles]);

  function handleHorarioSelect(horario: string, medicoId: number) {
    var params: any = GetJwtContent(user);
    var pacienteId: number = Number(params.PersonaId);
    setCreateTurnoRequest({
      MedicoId: medicoId,
      Fecha: horario,
      PacienteId: pacienteId,
    });
    setMedicoSelect(findMedicoById(medicoId));
    console.log(createTurnoRequest)
    showCreatTurnoModal();
  }

  async function handleConfirmCreateTurnoModal() {
     await crearTurno(createTurnoRequest);
    //evita que la funcion sea llamada veces extra, reinicia las variables una vez que el turno fue creado
    setCreateTurnoRequest((prevState) => ({
      ...prevState,
      MedicoId: 0,
      PacienteId: 0,
    }));
    //al hacer el redirect vuelve a llamar a getAll para que esten los turnos actualizados
    navigate("/pacientes", { state: { refreshTurnos: true } });
    closeCreatTurnoModal()
  }

  function showDiasDisponiblesEspecialidad(
    listaMedicos: IMedicoResponse[],
    especiliadSelect: string
  ): void {

    getTurnosDisponiblesByEspecialidad(especiliadSelect);

    setComponenteActivo("2");
  }

  return (
    <>
         <Opening title={titleOening} subTitle= {subtitleOening} customOpen="miniOpening"/>
         <div className="d-flex flex-column flex-wrap justify-content-center pt-4 pt-sm-5 ">

      {medicoSelect && (
        <CreatTurnoModal
          show={toggleCreateModal}
          handleClose={closeCreatTurnoModal}
          handleConfirm={handleConfirmCreateTurnoModal}
          medico={medicoSelect}
          fecha={createTurnoRequest.Fecha}
        />
      )}
      {componenteActivo == "0" && medicos && (
        <ListMedicos listMedicos={medicos} handleSelect={showDiasDisponibles}/>
       
      )}
      {
          componenteActivo == "1" && medicos && <ListEspecialidades
           listMedicos={medicos}
           getMedicosByEspecialidadSelected={showDiasDisponiblesEspecialidad}
         />
      }
      {componenteActivo == "2" && turnosDisponibles && (
        <CalendarioTurnoDisponible
          diasDisponible={turnosDisponibles}
          handleSelect={handleDiaSelect}
        />
      )}
      {componenteActivo == "3" && (
        <>
          {
            showTurnosDisponibles && medicos && (
              <ListHorariosPorMedico
                horariosPorMedico={showTurnosDisponibles}
                handleSelect={handleHorarioSelect}
                medicos={medicos}
              />
            )

        
          }
        </>
      )}

      <div>{error && <p className="text-danger">{error}</p>}</div>
    </div>
    </>
  );
}

export default CrearTurno;
