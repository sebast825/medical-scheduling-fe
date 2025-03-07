import { useEffect, useState } from "react";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import {  Table } from "react-bootstrap";
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
    { accessorKey: "startDate", header: "Inicio" }

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

                {headerGroup.headers.map((header:any) => (
                  <th key={header.id}>{header.column.columnDef.header}</th>
                ))}

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
                  <td className="dropdown">
                    <OneButton
                      handleSubmit={() => {
                        // Usa el id de la fila (rowData.id) en lugar de cell.id
                        handleDeleteLicense(rowData.id);
                        showModal();
                      }}
                      text="Cancelar"
                      variant="danger"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </button>
          <span>
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </button>
        </div>
        {/* <Table
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
                      handleDeleteLicense(license.id)
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
       */}
      </div>
    </>
  );
}

export default TableLicense;
