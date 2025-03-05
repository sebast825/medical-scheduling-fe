import { useEffect, useState } from "react";
import usePacientes from "../../../hooks/pacientes/usePacientes";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { ButtonGroup, Table } from "react-bootstrap";
import { getDate } from "../../../utils/formatDate";
import "./TableLicense.scss";
import useWindowSize from "../../../hooks/ScreenSize";

import InputRegex from "../../General/InputRegex/InputRegex";
import PacienteDropdown from "../../Dropdown/Secretario/PacienteDropdown";
import useIsSecretario from "../../../hooks/roles/useIsSecretario";
import useIsAdministrador from "../../../hooks/roles/useIsAdministrador";
import OneButton from "../../buttons/oneButton/OneButton";
import ChangeStatusPersona from "../../modals/changeStatusPeronsa/ChangeStatusPersona";
import useModal from "../../../hooks/useModal";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";
import { LicenseResponseDto } from "../../../types/Licenses/LicenseResponseDto.type";

interface ITableLicense{
  licenseList : LicenseResponseDto[],
  handleAction ? : (e : IPersonaResponse)=>void;
}

function TableLicense(props : ITableLicense) {

  const {licenseList,handleAction} = props;
 
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
  
/*
  useEffect(() => {
    const regEx = new RegExp(`^${fraseRegex}`, "i");
    const filteredItems = licenseList?.filter((paciente) => {
      return regEx.test(paciente.numeroDocumento);
    });
    setShowPersonas(filteredItems);
  }, [licenseList, fraseRegex]);*/

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
        className="text-center align-middle table  table-responsive"
      >
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Inicio</th>
            {windowSize.width > changeLayout && (
              <>
                <th>Finalización</th>
                <th>Motivo</th>
              </>
            )}

          </tr>
        </thead>
        <tbody>
          {licenseList &&
            licenseList.map((license, index) => (
              <tr key={license.Id}>
                <td className="index">{index}</td>

                <td>{license.Medico}</td>
                <td>{license.StartDate.toString()}</td>
                {windowSize.width > changeLayout && (
                  <>
                    <td>{license.EndTime?.toString()}</td>
                    <td>{license.Reason}</td>
                  </>
                )}
                <td className="dropdown ">
                 
                    <OneButton
                      handleSubmit={() => {
                        //setSelectedPersona(license)
                        showModal();
                      }}
                      text="Cancelar"
                      variant="danger"
                    />
               
                
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableLicense;
