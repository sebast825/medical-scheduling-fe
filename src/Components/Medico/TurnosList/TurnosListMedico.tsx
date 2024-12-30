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

interface ITurnosListMedico {
  //turnos :TurnoResponse[],
  //handleOpenModal: (turno: TurnoResponse) => void;
}

function TurnosListMedico() {
  const { medicoInfo } = useMedicoInfoContext();
  const { getTurnosHoyMedicoById, turnos, updateStatusTurno } = useGetTurnos();

  useEffect(() => {
    if (medicoInfo == undefined) return;
    getTurnosHoyMedicoById(medicoInfo?.id.toString());
  }, []);

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
                btnEvent={(e) => updateStatusTurno(e)}
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
