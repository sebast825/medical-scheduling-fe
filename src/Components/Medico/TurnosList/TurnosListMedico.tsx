import { useEffect, useState } from "react";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import CardTurnoMedico from "../CardTurnoMedico/CardTurnoMedico";
import {
  useMedicoInfoContext,
  useUserInfo,
} from "../../../context/authContext";
import useGetTurnos from "../../../hooks/turnos/useGetTurnos";

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

  useEffect(() => {
   // Este useEffect se dispara cuando `turnos` cambia.
   console.log(turnos);
 }, [turnos]);

 // Actualiza el turno modificado en el array de turnos.
 function sortTurnos(turnoModificado: TurnoResponse) {
   console.log("Turno modificado:", turnoModificado);

   const updateTurnos = turnos.map((turno) => {
     if (turno.id === turnoModificado.id) {
      turno.estado = turnoModificado.estado
      return turno; 
   }
     return turno; 
   });

   setTurnos(updateTurnos); 
 }
  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        {turnos.map((turno: TurnoResponse) => (
          <CardTurnoMedico
            key={turno.id}
            turno={turno}
            btnEvent={(e) => sortTurnos(e)}
          />
        ))}
      </div>
    </>
  );
}

export default TurnosListMedico;
