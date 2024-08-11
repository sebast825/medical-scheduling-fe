import { useEffect, useState } from "react";
import { useUserContext } from "../../context/authContext";
import {
  fetchMedicos,
  fetchTurnosDisponiblesByMedico,
} from "../../services/apiService";
import { IMedicoResponse } from "../../types/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import List from "../../Components/List/List";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import Calendar from "react-calendar";
import Calendario from "../../Components/Calendar/Calendar";
import HorarioDisponible from "../../Components/HorarioDisponible/HorarioDisponible";
import { getDate } from "../../utils/formatDate";
import HorarioDisponiblePorDia from "../../Components/HorarioDisponible/HorarioDisponible";

function BuscarPorMedico() {
  const user = useUserContext();
  const [medicos, setMedicos] = useState<IMedicoResponse[]>();
  const [error, setError] = useState<ErrorTypeAny>(null);
  const [componenteActivo, setComponenteActivo] = useState<string>("1"); // 'componente1', 'componente2', 'componente3'
  const [turnosDisponibles, setTurnosDisponibles] =
    useState<TurnoHorarioDisponibleResponseDTO[]>();
  const [showTurnosDisponibles, setShowTurnosDisponibles] =
    useState<TurnoHorarioDisponibleResponseDTO>();

  const [dateTurnosDisponibles, setDateTurnosDisponibles] = useState<Date[]>();

  const getMedicos = async () => {
    try {
      const response: IMedicoResponse[] = await fetchMedicos();

      setMedicos(response);
    } catch (err: any) {
      console.log(err);

      setError("Error desconocido");
    }
  };

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
    console.log("asasd");
  }, [turnosDisponibles]);

  function filtrarTurnos() {
    var filterTurnosDisponibles = turnosDisponibles?.map((elem) => elem.fecha);
    if (filterTurnosDisponibles) {
      setDateTurnosDisponibles(filterTurnosDisponibles);
    }
    // filterTurnosDisponibles?.forEach(elem =>{
    //   console.log(typeof(elem))
    // })
  }
  function showDiasDisponibles(e: number) {
    console.log("aca");
    getTurnosDisponiblesByMedico(e.toString());
    setComponenteActivo("2");
  }
  function handleSelect(e: string | undefined) {
    console.log(typeof e);

    if (typeof e == "string") {
      var selectHorarios = turnosDisponibles?.find(
        (elem) => getDate(elem.fecha.toString()) == getDate(e)
      );
      setShowTurnosDisponibles(selectHorarios);
    }
  }
  useEffect(() => {
    if (showTurnosDisponibles) {
      console.log(showTurnosDisponibles)
      setComponenteActivo("3");
    }  }, [showTurnosDisponibles]);

  
  const filterMedicos =
    medicos?.map((medico) => {
      return { nombre: medico.nombre + " " + medico.apellido, id: medico.id };
    }) || [];
  return (
    <div>
      <h2>Buscar Medico</h2>
      {componenteActivo == "1" && (
        <List listItems={filterMedicos} handleSelect={showDiasDisponibles} />
      )}
      {componenteActivo == "2" && (
        <Calendario
          dateList={dateTurnosDisponibles}
          handleSelect={handleSelect}
        />
      )}
      {componenteActivo == "3" && (
        <HorarioDisponiblePorDia TurnoHorarioResponse={showTurnosDisponibles} />
      )}
      <div>{error && <p className="text-danger">{error}</p>}</div>
    </div>
  );
}

export default BuscarPorMedico;
