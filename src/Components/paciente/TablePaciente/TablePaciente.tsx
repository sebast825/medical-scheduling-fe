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

function TablePaciente() {
  const [pacientesList, setPacientesList] = useState<IPacienteResponse[]>();
  const { getAllPacientes, pacienteList } = usePacientes();
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
  return (
    <>
      <div className="flex m-4">
        <Table striped bordered hover className="text-center align-middle">
          <thead>
            <tr>
              <th>Row</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Teléfono</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientesList &&
              pacientesList.map((paciente, index) => (
                <tr key={paciente.id}>
                  <td>{index}</td>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.apellido}</td>
                  <td>{paciente.numeroDocumento}</td>
                  <td>{paciente.telefono}</td>
                  <td className="d-flex justify-content-center">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Opciones
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                           
                  
                            <Dropdown.Item className="tezt-algin-right" onClick={() => console.log("medico")}>Nuevo Turno por Medico</Dropdown.Item>
                            <Dropdown.Item onClick={() => console.log("especialdiad")}>Nuevo Turno por Especialidad</Dropdown.Item>
                         
            
                         
                        <Dropdown.Item> Mas Informaicón</Dropdown.Item>
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
