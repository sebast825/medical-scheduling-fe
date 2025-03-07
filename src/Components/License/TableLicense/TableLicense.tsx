import { useEffect, useState } from "react";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { Table } from "react-bootstrap";
import useWindowSize from "../../../hooks/ScreenSize";
import InputRegex from "../../General/InputRegex/InputRegex";
import useIsSecretario from "../../../hooks/roles/useIsSecretario";
import useIsAdministrador from "../../../hooks/roles/useIsAdministrador";
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
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Pagiation from "../../General/Pagination/Pagiation";

interface ITableLicense {
  handleAction?: (e: IPersonaResponse) => void;
}

function TableLicense(props: ITableLicense) {
  //has all the licens
  const [licenseList, setLicenseList] = useState<LicenseResponseDto[]>();
  const user = useUserInfo();
  const windowSize = useWindowSize();
  const changeLayout: number = 600;

  const [fraseRegex, setFraseRegex] = useState<string>("");
  //has the licenses that will show fe
  const [showLicenses, setShowLicenses] = useState<LicenseResponseDto[]>();

  const { showModal, closeModal, toggleModal } = useModal();
  const { DeleteLicense } = useLicenseCacheQuery();

  //get license data
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

  //filter the data
  useEffect(() => {
    const regEx = new RegExp(`^${fraseRegex}`, "i");
    const filteredItems = licenseList?.filter((license) => {
      return regEx.test(license.medico);
    });
    setShowLicenses(filteredItems);
  }, [licenseList, fraseRegex]);

  const desktopColumns = [
    { accessorKey: "medico", header: "Nombre" },
    { accessorKey: "startDate", header: "Inicio" },
    { accessorKey: "endDate", header: "Finalización" },
    { accessorKey: "reason", header: "Motivo" },
  ];
  const mobileColumns = [
    { accessorKey: "medico", header: "Nombre" },

    { accessorKey: "startDate", header: "Inicio" },
    { accessorKey: "endDate", header: "Fin" },
  ];

  //if is mobile show less colluns to don't break the app
  const columns =
    windowSize.width > changeLayout ? desktopColumns : mobileColumns;

  const table = useReactTable({
    data: showLicenses || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  async function handleDeleteLicense(id: number) {
    console.log(id);
    await DeleteLicense(id);
    setLicenseList((prevlicenses) =>
      prevlicenses?.filter((prevlicense) => prevlicense.id !== id)
    );
  }
  return (
    <>
      {isLoading && <Spinner msge="Cargando Licencias" />}
      <div className="p-2 pt-0 d-flex  flex-column justify-content-center gap-3 ">
        <InputRegex
          placeholder="Buscar médico"
          onFraseRegexChage={setFraseRegex}
        />
        <Table striped bordered hover>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-center">
                <th key="index"> </th>
                {/* for numeration  */}
                {headerGroup.headers.map((header: any) => (
                  <th key={header.column.columnDef.header}>
                    {header.column.columnDef.header}
                  </th>
                ))}
                {/* for trahs icon */}
                <th key="trashIcon"></th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => {
              const cells = row.getVisibleCells();
              const rowData = row.original; // Accede a los datos originales de la fila

              return (
                <tr key={row.id} className="index text-center">
                  <td key={row.id}>{row.id}</td>

                  {cells.map(
                    (
                      cell: any //liceseRESPONSE PER ASI FUNCIONA
                    ) => (
                      <td key={cell.getValue()}>{cell.getValue()}</td>
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
          <Pagiation table={table} />
        </div>
      </div>
    </>
  );
}

export default TableLicense;
