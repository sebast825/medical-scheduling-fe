import ListMedicos from "../../Components/turno/listMedicos/ListMedicos";
import CalendarioTurnoDisponible from "../../Components/turno/calendarioTurnoDisponible/CalendarioTurnoDisponible";
import ListEspecialidades from "../../Components/turno/listEspecialdiad/ListEspecialidad";
import ListHorariosPorMedico from "../../Components/turno/listHorariosPorMedico/ListHorariosPorMedico";
import CreatTurnoModal from "../../Components/modals/CreateTurnoModal";
import Opening from "../../Components/General/Opening/Opening";
import useCreateTurnoLogic from "../../hooks/turnos/useCreateTurnoLogic";
import { Spinner } from "../../Components/statics/Spinner";
import { useEffect, useState } from "react";
import { spinnerMessages } from "../../constants/spinnerMessages";
import { getDate } from "../../utils/formatDate";


interface ICrearTurno {
  filterBy?: string;
}

function CrearTurno({ filterBy = "1" }: ICrearTurno) {

  const [componenteActivo, setComponenteActivo] = useState<string>(filterBy); // 'component1', 'component2', 'component3'
  const [subtitleOening, setSubtitleOening] = useState<string>("");
  const [msgeSpinner, setMsgeSpinner] = useState<string>(spinnerMessages.cargarMedicos);



  const {
    medicoSelect,
    toggleModal,
    closeModal,
    handleConfirmCreateTurnoModal,
    createTurnoRequest,
    medicos,
    showDiasDisponibles,
    showDiasDisponiblesEspecialidad,
    handleDiaSelect,
    turnosDisponibles,
    handleHorarioSelect,
    showTurnosDisponibles,
    isLoading,
    loadingDisponibilidades
  } = useCreateTurnoLogic(filterBy);
  useEffect(() => {
    if (showTurnosDisponibles) {
      setComponenteActivo("3");
    }
  }, [showTurnosDisponibles]);


  async function onSelectMedico(id: number) {
    await showDiasDisponibles(id);
    setComponenteActivo("2");
  }

  async function onSelectEspecialidad(especialidad: string) {
    await showDiasDisponiblesEspecialidad(especialidad);
    setComponenteActivo("2");
  }

  function onSelectDia(fecha: string) {
    handleDiaSelect(fecha);
    setComponenteActivo("3");
  }

  useEffect(() => {
    if (showTurnosDisponibles?.length) {
      const str = getDate(showTurnosDisponibles[0]?.fecha.toString() ?? "");
      setSubtitleOening(`Fecha: ${str}`);
    }
  }, [showTurnosDisponibles]);
  if (isLoading || loadingDisponibilidades) return <Spinner msge={msgeSpinner} />

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
              handleSelect={onSelectMedico}
            />
          </div>
        )}
        {componenteActivo == "1" && medicos && (
          <div>
            <h2 className="text-center">Seleccionar Especialidad</h2>
            <ListEspecialidades
              listMedicos={medicos}
              getMedicosByEspecialidadSelected={onSelectEspecialidad}
            />
          </div>
        )}
        {componenteActivo == "2" && turnosDisponibles && (
          <div>
            <h2 className="text-center">Seleccionar Fecha</h2>
            <CalendarioTurnoDisponible
              diasDisponible={turnosDisponibles}
              handleSelect={onSelectDia}
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
