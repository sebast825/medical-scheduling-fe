import { useState } from "react";
import { TurnoHorarioDisponibleResponseDTO } from "../../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { getDate } from "../../../utils/formatDate";
import BackLink from "../../buttons/BackLink/BackLink";
import HorarioDisponiblePorDiaMedico from "../cardMedicoHorarios/CardMedicoHorarios";

interface ISeleccionarHorario {
  showTurnosDisponibles: TurnoHorarioDisponibleResponseDTO;
  handleHorarioSelect: (horario: string) => void;
  nombreMedico?: string;
}

function SeleccionarHorario({
  showTurnosDisponibles,
  handleHorarioSelect,
  nombreMedico,
}: ISeleccionarHorario) {


  

  return (
    <>
      {" "}
      <h2>Seleccionar Horario</h2>
      <p>
        {getDate(
          showTurnosDisponibles ? showTurnosDisponibles?.fecha.toString() : ""
        )}
      </p>
      <HorarioDisponiblePorDiaMedico
        TurnoHorarioResponse={showTurnosDisponibles}
        handleSelect={handleHorarioSelect}
        nombreMedico={nombreMedico}
      />
      <BackLink />
    </>
  );
}

export default SeleccionarHorario;
