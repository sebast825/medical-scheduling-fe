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
  const { getTurnosMedicoById, turnos, updateStatusTurno } = useGetTurnos();


  useEffect(() => {
    if (medicoInfo == undefined) return;
    getTurnosMedicoById(medicoInfo?.id.toString());
  }, []);

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
