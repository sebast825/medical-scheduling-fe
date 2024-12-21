import { DisponibilidadMedico } from "../../../types/DisponibilidadMedico/DisponibilidadMedico";
import splitKeyNombreEspecialidad from "../../../utils/splitKeyNombreEspecialidad";
import useIsAdministrador from "../../../hooks/roles/useIsAdministrador";
import DisponibilidadHorarioDropdown from "../../Dropdown/Admin/DisponibilidadHorarioDropdown";

interface IDisponibilidadHorarioCard {
  clave: string;
  horarios: DisponibilidadMedico[];
  showEditModal: () => void;
  showCreateModal: () => void;
  setEditarDisponibilidad: (e: DisponibilidadMedico) => void;
}
function DisponibilidadHorarioCard(props: IDisponibilidadHorarioCard) {
  const {
    clave,
    horarios,
    showEditModal,
    showCreateModal,
    setEditarDisponibilidad,
  } = props;

  const isAdmin = useIsAdministrador();

  return (
    <div className="card col-12 col-lg-3  mb-3" key={clave}>
      <div className="card-header d-flex align-items-center  justify-content-center">
        <div className=" text-center ms-auto">
          <h5>{splitKeyNombreEspecialidad(clave).nombre}</h5>
          <h6>{splitKeyNombreEspecialidad(clave).especialidad}</h6>
        </div>

        <div className="ms-auto">
          {isAdmin && (
            <DisponibilidadHorarioDropdown
              clave={clave}
              horarios={horarios}
              showEditModal={showEditModal}
              showCreateModal={showCreateModal}
              setEditarDisponibilidad={setEditarDisponibilidad}
            />
          )}
        </div>
      </div>
      <div className="card-body ">
        {horarios.map((horario, index) => (
          <div className="row mb-2" key={index}>
            <div className=" col-6">
              <strong>{horario.diaSemana}</strong>
            </div>
            <div className=" col-6 text-center">
              <span>
                {horario.startTime} - {horario.endTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisponibilidadHorarioCard;
