import { useEffect, useState } from "react";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import CardTurnoMedico from "../CardTurnoMedico/CardTurnoMedico";

interface ITurnosListMedico{
   turnos :TurnoResponse[],
   handleOpenModal: (turno: TurnoResponse)=>void
}

function TurnosListMedico(props :ITurnosListMedico){

   const {turnos, handleOpenModal} = props;

 

   return(
      <>
  
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
      {turnos.map((turno: TurnoResponse) => (
        <CardTurnoMedico
          key={turno.id}
          turno={turno}
          btnEvent={() => handleOpenModal(turno)}
        />
      ))}
    
      </div>

      </>
   )
}

export default TurnosListMedico;