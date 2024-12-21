import { Dropdown, ButtonGroup } from "react-bootstrap";
import { DisponibilidadMedico } from "../../../types/DisponibilidadMedico/DisponibilidadMedico";
import splitKeyNombreEspecialidad from "../../../utils/splitKeyNombreEspecialidad";
import useIsAdministrador from "../../../hooks/roles/useIsAdministrador";

interface IDisponibilidadHorarioCard{
   clave: string,
   horarios : DisponibilidadMedico[],
   showEditModal : ()=>void,
   showCreateModal : ()=>void,
   setEditarDisponibilidad : (e : DisponibilidadMedico) => void

}
function DisponibilidadHorarioCard(props : IDisponibilidadHorarioCard){

   const {clave,horarios,showEditModal,showCreateModal,setEditarDisponibilidad} = props;
    
  const isAdmin = useIsAdministrador()

   return (

      <div className="card col-12 col-lg-3  mb-3" key={clave}>
            <div className="card-header d-flex align-items-center  justify-content-center">
              <div className=" text-center ms-auto">
                <h5>{splitKeyNombreEspecialidad(clave).nombre}</h5>
                <h6>{splitKeyNombreEspecialidad(clave).especialidad}</h6>
              </div>

              <div className="ms-auto">
                {isAdmin &&
                  
                  <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      Editar Información
                    </Dropdown.Item>
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
                </Dropdown>}
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
   )
}

export default DisponibilidadHorarioCard;