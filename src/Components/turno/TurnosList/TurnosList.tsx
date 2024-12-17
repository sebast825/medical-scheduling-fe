import { useEffect, useState } from "react";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import CardPaciente from "../../paciente/CardTurno/CardTurno";

interface ITurnosList{
   turnos :TurnoResponse[],
   handleOpenModal?: (turno: TurnoResponse)=>void
}

function TurnosList(props :ITurnosList){

   const {turnos, handleOpenModal} = props;

 

   return(
      <>
  
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
      {turnos.map((turno: TurnoResponse) => (
        <CardPaciente
          key={turno.id}
          turno={turno}
          btnEvent={handleOpenModal ? () => handleOpenModal(turno) : undefined}
        />
      ))}
    
      </div>

      </>
   )
}

export default TurnosList;