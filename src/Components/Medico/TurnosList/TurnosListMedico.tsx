import { useEffect, useState } from "react";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import CardTurnoMedico from "../CardTurnoMedico/CardTurnoMedico";
import {
  useMedicoInfoContext,
  useUserInfo,
} from "../../../context/authContext";
import useGetTurnos from "../../../hooks/turnos/useGetTurnos";
import { ESTADOS_TURNO } from "../../../utils/estadoTurno";
import TitleContent from "../../General/TitlteContent/TitleContent";
import useTurnosMedicoCacheQuery from "../../../hooks/turnos/useTurnosMedicoCacheQuery";
import { Spinner } from "../../statics/Spinner";
import { spinnerMessages } from "../../../constants/spinnerMessages";

interface ITurnosListMedico {
  //turnos :TurnoResponse[],
  //handleOpenModal: (turno: TurnoResponse) => void;
}

function TurnosListMedico() {

  const {turnos,updateTurnoCache,isFetching} = useTurnosMedicoCacheQuery()
 
  useEffect(()=>{console.log(turnos)},[turnos])
  if(isFetching) return <Spinner msge={spinnerMessages.cargarTurnos}/>
  return (
    <>
      <div
        style={{ maxWidth: "1200px", margin: "auto" }}
        className="pt-3 pb-3 pt-md-4 pb-md-5"
      >
        {turnos && turnos.length > 0 ? (
          <>
            <TitleContent title="Turnos para hoy" pading={false} />

            {turnos.map((turno: TurnoResponse) => (
              <CardTurnoMedico
                key={turno.id}
                turno={turno}
                btnEvent={(e) => updateTurnoCache(e)}
              />
            ))}
          </>
        ) : (

          <TitleContent title=" Hoy no tenés turnos agendados" />

          
        )}
      </div>
    </>
  );
}

export default TurnosListMedico;
