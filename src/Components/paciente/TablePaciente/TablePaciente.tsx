import { useEffect, useState } from "react";
import usePacientes from "../../../hooks/pacientes/usePacientes";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { ButtonGroup, Dropdown, Table } from "react-bootstrap";
import { getDate } from "../../../utils/formatDate";
import "./TablePaciente.scss";
import useWindowSize from "../../../hooks/ScreenSize";
import { usePacienteContext } from "../../../context/authContext";
import useRedirects from "../../../hooks/useRedicrects";
import InputRegex from "../../General/InputRegex/InputRegex";

function TablePaciente() {
  const { getAllPacientes, pacienteList } = usePacientes();
  const windowSize = useWindowSize();
  const changeLayout: number = 600;
  const { setPacienteInfo } = usePacienteContext();
  const {
    redirectToNuevoTurnoFilterMedico,
    redirectToNuevoTurnoFilterEspecialidad,
    redirectListadoTurnos,
    redirectInformaciónPacienteSecretario,
  } = useRedirects();
  const [fraseRegex, setFraseRegex] = useState<string>("");
  const [showPacientes, setShowPacientes] = useState<IPacienteResponse[]>();

  useEffect(() => {
    async function getPacientes() {
      await getAllPacientes();
    }
    getPacientes();
    pacienteList?.forEach((elem) => console.log(elem));
  }, []);

  useEffect(() => {
    const regEx = new RegExp(`^${fraseRegex}`, "i");
    const filteredItems = pacienteList?.filter((paciente) => {
      return regEx.test(paciente.numeroDocumento);
    });
    setShowPacientes(filteredItems);
  }, [pacienteList, fraseRegex]);

  function nuevoTurnoByMedico(paciente: IPacienteResponse): void {
    setPacienteInfo(paciente);
    redirectToNuevoTurnoFilterMedico();
  }
  function nuevoTurnoByEspecialidad(paciente: IPacienteResponse): void {
    setPacienteInfo(paciente);
    redirectToNuevoTurnoFilterEspecialidad();
  }

  function redirectTurnosPaciente(paciente: IPacienteResponse): void {
    setPacienteInfo(paciente);
    redirectListadoTurnos();
  }
  function redirectInformacionPaciente(paciente: IPacienteResponse): void {
    setPacienteInfo(paciente);
    redirectInformaciónPacienteSecretario();
  }


  return (
    <div className="p-2 d-flex  flex-column justify-content-center gap-3 ">
      <InputRegex
        placeholder="Buscar paciente por documento"
        onFraseRegexChage={setFraseRegex}
      />

      <Table
        striped
        bordered
        hover
        table-responsive
        className="text-center align-middle table"
      >
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
          {showPacientes &&
            showPacientes.map((paciente, index) => (
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
                    <Dropdown.Toggle
                      variant="primary"
                      id="dropdown-basic"
                    ></Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        //className="tezt-algin-right"
                        onClick={() => nuevoTurnoByMedico(paciente)}
                      >
                        Nuevo Turno por Medico
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => nuevoTurnoByEspecialidad(paciente)}
                      >
                        Nuevo Turno por Especialidad
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() => redirectInformacionPaciente(paciente)}
                      >
                        {" "}
                        Mas Información
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => redirectTurnosPaciente(paciente)}
                      >
                        Turnos
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TablePaciente;
