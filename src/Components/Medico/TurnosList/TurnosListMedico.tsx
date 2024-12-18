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
  const { getTurnosHoyMedicoById, turnos, updateStatusTurno } = useGetTurnos();

  useEffect(() => {
    if (medicoInfo == undefined) return;
    getTurnosHoyMedicoById(medicoInfo?.id.toString());
  }, []);

  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        {turnos && turnos.length > 0 ? (
          turnos.map((turno: TurnoResponse) => (
            <CardTurnoMedico
              key={turno.id}
              turno={turno}
              btnEvent={(e) => updateStatusTurno(e)}
            />
          ))
        ) : (
          <div className="container d-flex justify-content-center p-md-5 pt-5 p-2">
            <h4>Hoy no tenés turnos agendados</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default TurnosListMedico;
