import { Dropdown, ButtonGroup } from "react-bootstrap";
import { DisponibilidadMedico } from "../../../types/DisponibilidadMedico/DisponibilidadMedico";

interface IDisponibilidadHorarioDropdown {
  clave: string;
  horarios: DisponibilidadMedico[];
  showEditModal: () => void;
  showCreateModal: () => void;
  setEditarDisponibilidad: (e: DisponibilidadMedico) => void;
}
function DisponibilidadHorarioDropdown(props: IDisponibilidadHorarioDropdown) {
  const {
    clave,
    horarios,
    showEditModal,
    showCreateModal,
    setEditarDisponibilidad,
  } = props;

  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic"></Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            setEditarDisponibilidad(horarios[0]);
            showCreateModal();
          }}
        >
          Crear Horario
        </Dropdown.Item>

        <Dropdown className="hover">
          <Dropdown.Toggle as={Dropdown.ItemText}>
            Editar Horario
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {horarios.map((horario, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  setEditarDisponibilidad(horario);
                  showEditModal();
                }}
              >
                <div className="d-flex justify-content-between">
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {`${horario.diaSemana}: `}{" "}
                  </span>
                  <span>
                    {horario.startTime} - {horario.endTime}
                  </span>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DisponibilidadHorarioDropdown;
