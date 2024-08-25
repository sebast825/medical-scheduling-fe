import { useEffect, useState } from "react";
import usePacientes from "../../../hooks/pacientes/usePacientes";
import { IPacienteResponse } from "../../../types/Paciente/PacienteResponse.type";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Dropdown,
  Table,
} from "react-bootstrap";
import { getDate } from "../../../utils/formatDate";
import OneButton from "../../buttons/oneButton/OneButton";
import "./TablePaciente.scss";
import useWindowSize from "../../../hooks/ScreenSize";
import { usePacienteContext } from "../../../context/authContext";
import useRedirects from "../../../hooks/useRedicrects";

function TablePaciente() {
  const [pacientesList, setPacientesList] = useState<IPacienteResponse[]>();
  const { getAllPacientes, pacienteList } = usePacientes();
  const windowSize = useWindowSize();
  const changeLayout: number = 600;
const {setPacienteInfo}= usePacienteContext();
const {redirectToNuevoTurnoFilterMedico}= useRedirects()

  useEffect(() => {
    getPacientes();
  }, []);

  async function getPacientes() {
    var pacientes: IPacienteResponse[] | undefined = await getAllPacientes();
    if (pacientes != undefined) {
      setPacientesList(pacientes);
    }
  }
  useEffect(() => {
    pacienteList?.forEach((elem) => console.log(elem));
  }, []);

  function nuevoTurnoByMedico(paciente : IPacienteResponse) : void {
      setPacienteInfo(paciente)
      redirectToNuevoTurnoFilterMedico()
  }
  return (
    <>
      <div className="flex m-0 m-md-4 table-container">
        <Table striped bordered hover table-responsive className="text-center align-middle table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Apellido</th>
              {windowSize.width > changeLayout && (
                <>
          
                  <th>Documento</th>
                  <th>Teléfono</th>
                  <th>Fecha Nacimiento</th>

                </>
              )}

              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientesList &&
              pacientesList.map((paciente, index) => (
                <tr key={paciente.id}>
                  <td className="index">{index}</td>
           
                  <td>{paciente.nombre}</td>
                  <td>{paciente.apellido}</td>
                  {windowSize.width > changeLayout && (
                    <>
                      <td>{paciente.numeroDocumento}</td>
                      <td>{paciente.telefono}</td>
                      <td>{getDate(paciente.fechaNacimiento)}</td>

                    </>
                  )}
                  <td className="dropdown ">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          className="tezt-algin-right"
                          onClick={() =>nuevoTurnoByMedico(paciente)}
                        >
                          Nuevo Turno por Medico
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => console.log("especialdiad")}
                        >
                          Nuevo Turno por Especialidad
                        </Dropdown.Item>

                        <Dropdown.Item> Mas Informaición</Dropdown.Item>
                        <Dropdown.Item>Turnos</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default TablePaciente;
