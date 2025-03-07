import { useEffect, useState } from "react";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { Button, Table } from "react-bootstrap";
import useWindowSize from "../../../hooks/ScreenSize";
import InputRegex from "../../General/InputRegex/InputRegex";
import PacienteDropdown from "../../Dropdown/Secretario/PacienteDropdown";
import useIsSecretario from "../../../hooks/roles/useIsSecretario";
import useIsAdministrador from "../../../hooks/roles/useIsAdministrador";
import OneButton from "../../buttons/oneButton/OneButton";
import useModal from "../../../hooks/useModal";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";
import { LicenseResponseDto } from "../../../types/Licenses/LicenseResponseDto.type";
import "./TableLicense.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchGetAllLicenses } from "../../../services/apiService";
import { useUserInfo } from "../../../context/authContext";
import { Spinner } from "../../statics/Spinner";
import useLicenseCacheQuery from "../../../hooks/License/useLicenseCacheQuery";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

interface ITableLicense {
  //licenseList: LicenseResponseDto[];
  handleAction?: (e: IPersonaResponse) => void;
}

function TableLicense(props: ITableLicense) {
  const [licenseList, setLicenseList] = useState<LicenseResponseDto[]>();
  //  const {licenseList,handleAction} = props;
  const user = useUserInfo();

  const { data: licenses, isLoading } = useQuery({
    queryFn: () => {
      return user ? fetchGetAllLicenses(user) : [];
    },
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
  const { DeleteLicense } = useLicenseCacheQuery();
  function isPacienteResponse(
    persona: IPersonaResponse | IPacienteResponse
  ): persona is IPacienteResponse {
    return (persona as IPacienteResponse).nombreEmergencia !== undefined;
  }

  const long = [
    { accessorKey: "medico", header: "Nombre" },
    { accessorKey: "startDate", header: "Inicio" },
    { accessorKey: "endDate", header: "Finalización" },
    { accessorKey: "reason", header: "Motivo" },
  ];
  const short = [
    { accessorKey: "medico", header: "Nombre" },

    { accessorKey: "startDate", header: "Inicio" },
    { accessorKey: "endDate", header: "Finalización" },
  ];

  const columns = windowSize.width > changeLayout ? long : short;

  const table = useReactTable({
    data: licenseList || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  /*
  useEffect(() => {
    const regEx = new RegExp(`^${fraseRegex}`, "i");
    const filteredItems = licenseList?.filter((paciente) => {
      return regEx.test(paciente.numeroDocumento);
    });
    setShowPersonas(filteredItems);
  }, [licenseList, fraseRegex]);*/
  async function handleDeleteLicense(id: number) {
    console.log(id);
    //await DeleteLicense(id);
    setLicenseList((prevlicenses) =>
      prevlicenses?.filter((prevlicense) => prevlicense.id !== id)
    );
  }
  return (
    <>
      {isLoading && <Spinner msge="Cargando Licencias" />}
      <div className="p-2 pt-0 d-flex  flex-column justify-content-center gap-3 ">
        <InputRegex
          placeholder="Buscar paciente por documento"
          onFraseRegexChage={setFraseRegex}
        />
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th key={headerGroup.id}></th>
                {/* for numeration  */}
                {headerGroup.headers.map((header: any) => (
                  <th key={header.id}>{header.column.columnDef.header}</th>
                ))}
                {/* for trahs icon */}
                <th key={headerGroup.id}></th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const cells = row.getVisibleCells();
              const rowData = row.original; // Accede a los datos originales de la fila

              return (
                <tr key={row.id}>
                  <td key={row.id}>{row.id}</td>

                  {cells.map(
                    (
                      cell: any //liceseRESPONSE PER ASI FUNCIONA
                    ) => (
                      <td key={cell.id}>{cell.getValue()}</td>
                    )
                  )}
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => {
                        handleDeleteLicense(rowData.id);
                        showModal();
                      }}
                      //     style={{ cursor: "pointer", color: "red" }}
                      title="Eliminar"
                      className="deleteIcon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {" "}
              <FontAwesomeIcon icon={faAnglesLeft} />
            </Button>

            <h5 className="mb-0 d-flex flex-row">
              {table.getState().pagination.pageIndex + 1} /{" "}
              {table.getPageCount()}
            </h5>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableLicense;
