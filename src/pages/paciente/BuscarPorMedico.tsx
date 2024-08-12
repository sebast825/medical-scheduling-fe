import { useEffect, useState } from "react";
import { useUserContext } from "../../context/authContext";
import {
  fetchMedicos,
  fetchTurnosDisponiblesByMedico,
} from "../../services/apiService";
import { IMedicoResponse } from "../../types/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import List from "../../Components/General/List/List";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import Calendario from "../../Components/turno/Calendar/Calendar";
import { getDate } from "../../utils/formatDate";
import HorarioDisponiblePorDia from "../../Components/turno/HorarioDisponiblePorDiaMedico/HorarioDisponiblePorDiaMedico";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackLink from "../../Components/buttons/BackLink/BackLink";
import SeleccionarHorario from "../../Components/turno/SeleccionarHorario/SeleccionarHorario";

function BuscarPorMedico() {
  const user = useUserContext();
  const [medicos, setMedicos] = useState<IMedicoResponse[]>();
  const [error, setError] = useState<ErrorTypeAny>(null);
  const [componenteActivo, setComponenteActivo] = useState<string>("1"); // 'componente1', 'componente2', 'componente3'
  const [turnosDisponibles, setTurnosDisponibles] =
    useState<TurnoHorarioDisponibleResponseDTO[]>();
  const [showTurnosDisponibles, setShowTurnosDisponibles] =
    useState<TurnoHorarioDisponibleResponseDTO>();
  const [nombreMedicoSelect, setNombreMedicoSelect] = useState<string>();
  const [dateTurnosDisponibles, setDateTurnosDisponibles] = useState<Date[]>();
  const navigate = useNavigate();

  const getMedicos = async () => {
    try {
      const response: IMedicoResponse[] = await fetchMedicos();

      setMedicos(response);
    } catch (err: any) {
      console.log(err);
      setError("Error desconocido");
    }
  };

  //al cargar el componente llama al listado de medicos
  useEffect(() => {
    getMedicos();
  }, []);

  const getTurnosDisponiblesByMedico = async (id: string) => {
    try {
      const response: TurnoHorarioDisponibleResponseDTO[] =
        await fetchTurnosDisponiblesByMedico(user, id);
      setTurnosDisponibles(response);

      console.log(response);
      return response;
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message || "Error desconocido");
      } else {
        setError("Error desconocido");
      }
    }
  };

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
    console.log("aca");
    getTurnosDisponiblesByMedico(e.toString());
    var nombreMedico = medicos?.find((elem) => elem.id === e);
    setNombreMedicoSelect(nombreMedico?.nombre + " " + nombreMedico?.apellido);
    setComponenteActivo("2");
  }

  function fechaSeleccionadaCalendario(e: string) {
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

    setComponenteActivo("1");
  }

  //objete medicos filtrado, solo con los datos necesarios
  const filterMedicos =
    medicos?.map((medico) => {
      return { nombre: medico.nombre + " " + medico.apellido, id: medico.id };
    }) || [];

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center
    p-4 gap-2"
    >
      {componenteActivo == "1" && (
        <>
          <h2>Seleccionar Medico</h2>

          <List listItems={filterMedicos} handleSelect={showDiasDisponibles} />
        </>
      )}
      {componenteActivo == "2" && (
        <>

          <Calendario
            dateList={dateTurnosDisponibles}
            handleSelect={fechaSeleccionadaCalendario}
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
