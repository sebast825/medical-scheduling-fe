import { useEffect, useState } from "react";
import usePacientes from "../../../hooks/pacientes/usePacientes";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { ButtonGroup, Table } from "react-bootstrap";
import { getDate } from "../../../utils/formatDate";
import "./TablePaciente.scss";
import useWindowSize from "../../../hooks/ScreenSize";

import InputRegex from "../../General/InputRegex/InputRegex";
import PacienteDropdown from "../../Dropdown/Secretario/PacienteDropdown";
import useIsSecretario from "../../../hooks/roles/useIsSecretario";
import useIsAdministrador from "../../../hooks/roles/useIsAdministrador";
import OneButton from "../../buttons/oneButton/OneButton";
import ChangeStatusPersona from "../../modals/changeStatusPeronsa/ChangeStatusPersona";
import useModal from "../../../hooks/useModal";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";

interface ITablePersonas{
  personaList : IPersonaResponse[] | IPacienteResponse[],
  handleAction ? : (e : IPersonaResponse)=>void;
}

function TablePersonas(props : ITablePersonas) {

  const {personaList,handleAction} = props;
 
  const windowSize = useWindowSize();
  const changeLayout: number = 600;

  const [fraseRegex, setFraseRegex] = useState<string>("");
  const [showPersonas, setShowPersonas] = useState<IPacienteResponse[] | IPersonaResponse[]>();
  const isSecretario = useIsSecretario();
  const isAdmin = useIsAdministrador();
  const [selectedPersona, setSelectedPersona] = useState<IPersonaResponse | null>(null);

  const { showModal, closeModal, toggleModal } = useModal();

  function isPacienteResponse(persona: IPersonaResponse | IPacienteResponse): persona is IPacienteResponse {
    return (persona as IPacienteResponse).nombreEmergencia !== undefined;
  }
  

  useEffect(() => {
    const regEx = new RegExp(`^${fraseRegex}`, "i");
    const filteredItems = personaList?.filter((paciente) => {
      return regEx.test(paciente.numeroDocumento);
    });
    setShowPersonas(filteredItems);
  }, [personaList, fraseRegex]);

  return (
    <div className="p-2 pt-0 d-flex  flex-column justify-content-center gap-3 ">
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

            <th>{isAdmin ? "Cambiar Estado" : "Opciones"}</th>
          </tr>
        </thead>
        <tbody>
          {showPersonas &&
            showPersonas.map((paciente, index) => (
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
                  {isSecretario && isPacienteResponse(paciente) &&<PacienteDropdown paciente={paciente} />}
                  {isAdmin && !isPacienteResponse(paciente) && (
                    <OneButton
                      handleSubmit={() => {
                        setSelectedPersona(paciente)
                        showModal();
                      }}
                      text="Editar"
                      variant="danger"
                    />
                  )}
                  {selectedPersona && handleAction && (
                    <ChangeStatusPersona
                      modalField={selectedPersona}
                      show={toggleModal}
                      handleClose={closeModal}
                      handleConfirm={(e: IPersonaResponse) =>
                        handleAction(e)
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TablePersonas;
