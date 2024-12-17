import { useEffect, useState } from "react";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import CardTurnoMedico from "../CardTurnoMedico/CardTurnoMedico";
import {
  useMedicoInfoContext,
  useUserInfo,
} from "../../../context/authContext";
import useGetTurnos from "../../../hooks/turnos/useGetTurnos";
import { ESTADOS_TURNO } from "../../../utils/estadoTurno";

interface ITurnosListMedico {
  //turnos :TurnoResponse[],
  //handleOpenModal: (turno: TurnoResponse) => void;
}

function TurnosListMedico(props: ITurnosListMedico) {
  const { medicoInfo } = useMedicoInfoContext();
  const { getTurnosMedicoById, turnos, setTurnos } = useGetTurnos();
  const user = useUserInfo();

  useEffect(() => {
    if (medicoInfo == undefined) return;
    getTurnosMedicoById(medicoInfo?.id.toString());
  }, []);

  // Actualiza el turno modificado en el array de turnos.
  function updateStatusTurno(turnoModificado: TurnoResponse) {
    console.log("Turno modificado:", turnoModificado);

    const updateTurnos = turnos.map((turno) => {
      if (turno.id === turnoModificado.id) {
        turno.estado = turnoModificado.estado;
        return turno;
      }
      return turno;
    });
    setTurnos(updateTurnos);
    setTurnos(sortTurnos());
  }

  const prioridadTurnos = {
    [ESTADOS_TURNO.EN_PROGRESO]: 1,
    [ESTADOS_TURNO.LLAMANDO]: 2,
    [ESTADOS_TURNO.PROGRAMADO]: 3,
    [ESTADOS_TURNO.COMPLETADO]: 4,
    [ESTADOS_TURNO.CANCELADO]: 5,
    [ESTADOS_TURNO.NO_ASISTIDO]: 6,
  };

  function sortTurnos() {
    //se usa el spread operator para crear una copia y no modificar el estado original
    //el 100 en caso ed que el estad no este definido tiene la priooridad mas alta
    let ordenarTurnos = [...turnos].sort((a, b) => {
      let prioridadA = prioridadTurnos[a.estado] || 100;
      let prioridadB = prioridadTurnos[b.estado] || 100;
      return prioridadA - prioridadB;
    });
    return ordenarTurnos;
  }
  turnos.forEach((elem) => console.log(elem.estado));

  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        {turnos.map((turno: TurnoResponse) => (
          <CardTurnoMedico
            key={turno.id}
            turno={turno}
            btnEvent={(e) => updateStatusTurno(e)}
          />
        ))}
      </div>
    </>
  );
}

export default TurnosListMedico;
