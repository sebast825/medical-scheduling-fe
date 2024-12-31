import ListMedicos from "../../Components/turno/listMedicos/ListMedicos";
import CalendarioTurnoDisponible from "../../Components/turno/calendarioTurnoDisponible/CalendarioTurnoDisponible";
import ListEspecialidades from "../../Components/turno/listEspecialdiad/ListEspecialidad";
import ListHorariosPorMedico from "../../Components/turno/listHorariosPorMedico/ListHorariosPorMedico";
import CreatTurnoModal from "../../Components/modals/CreateTurnoModal";
import Opening from "../../Components/General/Opening/Opening";
import useCreateTurnoLogic from "../../hooks/turnos/useCreateTurnoLogic";

interface ICrearTurno {
  filterBy?: string; 
}

function CrearTurno({ filterBy = "1" }: ICrearTurno) {
  const {
    medicoSelect,
    toggleModal,
    closeModal,
    handleConfirmCreateTurnoModal,
    createTurnoRequest,
    componenteActivo,
    medicos,
    showDiasDisponibles,
    showDiasDisponiblesEspecialidad,
    handleDiaSelect,
    turnosDisponibles,
    subtitleOening,
    handleHorarioSelect,
    showTurnosDisponibles,
  } = useCreateTurnoLogic(filterBy);

  return (
    <>
      <Opening title="Nuevo Turno" />
      <div className="d-flex flex-column flex-wrap justify-content-center pt-4 pt-sm-5 pb-4 pb-sm-5 ">
        {medicoSelect && (
          <CreatTurnoModal
            show={toggleModal}
            handleClose={closeModal}
            handleConfirm={handleConfirmCreateTurnoModal}
            medico={medicoSelect}
            fecha={createTurnoRequest.Fecha}
          />
        )}
        {componenteActivo == "0" && medicos && (
          <div>
            <h2 className="text-center">Seleccionar Medico</h2>
            <ListMedicos
              listMedicos={medicos}
              handleSelect={showDiasDisponibles}
            />
          </div>
        )}
        {componenteActivo == "1" && medicos && (
          <div>
            <h2 className="text-center">Seleccionar Especialidad</h2>
            <ListEspecialidades
              listMedicos={medicos}
              getMedicosByEspecialidadSelected={showDiasDisponiblesEspecialidad}
            />
          </div>
        )}
        {componenteActivo == "2" && turnosDisponibles && (
          <div>
            <h2 className="text-center">Seleccionar Fecha</h2>
            <CalendarioTurnoDisponible
              diasDisponible={turnosDisponibles}
              handleSelect={handleDiaSelect}
            />
          </div>
        )}
        {componenteActivo == "3" && (
          <>
            {showTurnosDisponibles && medicos && (
              <div>
                <h2 className="text-center">Seleccionar Horario</h2>
                <h5 className="text-center">{subtitleOening}</h5>
                <ListHorariosPorMedico
                  horariosPorMedico={showTurnosDisponibles}
                  handleSelect={handleHorarioSelect}
                  medicos={medicos}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default CrearTurno;
