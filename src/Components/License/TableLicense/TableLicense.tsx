import { useEffect, useState } from "react";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { Table } from "react-bootstrap";
import useWindowSize from "../../../hooks/ScreenSize";
import InputRegex from "../../General/InputRegex/InputRegex";
import PacienteDropdown from "../../Dropdown/Secretario/PacienteDropdown";
import useIsSecretario from "../../../hooks/roles/useIsSecretario";
import useIsAdministrador from "../../../hooks/roles/useIsAdministrador";
import OneButton from "../../buttons/oneButton/OneButton";
import useModal from "../../../hooks/useModal";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";
import { LicenseResponseDto } from "../../../types/Licenses/LicenseResponseDto.type";
import "./TableLicense.scss"
import { useQuery } from "@tanstack/react-query";
import { fetchGetAllLicenses } from "../../../services/apiService";
import { useUserInfo } from "../../../context/authContext";
import { Spinner } from "../../statics/Spinner";

interface ITableLicense {
  //licenseList: LicenseResponseDto[];
  handleAction?: (e: IPersonaResponse) => void;
}

function TableLicense(props: ITableLicense) {
  const [licenseList, setLicenseList] = useState<LicenseResponseDto[]>();
  //  const {licenseList,handleAction} = props;
const user = useUserInfo();

  const { data: licenses, isLoading } = useQuery({
    queryFn: () => {return user ? fetchGetAllLicenses(user) : [];},
    queryKey: ["licenseList", user],
    staleTime: Infinity,
  });

  useEffect(() => {
    setLicenseList(licenses);
  }, [licenses]);


  const windowSize = useWindowSize();
  const changeLayout: number = 600;

  const [fraseRegex, setFraseRegex] = useState<string>("");
  const [showPersonas, setShowPersonas] = useState<
    IPacienteResponse[] | IPersonaResponse[]
  >();
  const isSecretario = useIsSecretario();
  const isAdmin = useIsAdministrador();
  const [selectedPersona, setSelectedPersona] =
    useState<IPersonaResponse | null>(null);

  const { showModal, closeModal, toggleModal } = useModal();

  function isPacienteResponse(
    persona: IPersonaResponse | IPacienteResponse
  ): persona is IPacienteResponse {
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
    <>{isLoading&&
           <Spinner msge="Cargando Licencias"/>}
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
              <tr key={license.id}>
                <td className="index">{index}</td>

                <td>{license.medico}</td>
                <td>{license.startDate}</td>
                {windowSize.width > changeLayout && (
                  <>
                    <td>{license.endDate ==  null ? "-" :license.endDate  }</td>
                    <td>{license.reason == "" ? "-": license.reason}</td>
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
    </div></>
    
  );
}

export default TableLicense;
