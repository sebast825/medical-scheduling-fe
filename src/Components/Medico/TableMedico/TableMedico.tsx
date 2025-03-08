import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./TableMedico.scss";
import useWindowSize from "../../../hooks/ScreenSize";
import InputRegex from "../../General/InputRegex/InputRegex";
import useMedicos from "../../../hooks/medicos/useMedicos";
import { IMedicoResponse } from "../../../types/Medico/MedicoResponse.type";
import MedicoDropdown from "../../Dropdown/Admin/MedicoDropdown";
import useMedicosCacheQuery from "../../../hooks/medicos/useMedicosCacheQuery";
import { Spinner } from "../../statics/Spinner";
import { spinnerMessages } from "../../../constants/spinnerMessages";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Pagination from "../../General/Pagination/Pagination";

function TableMedico() {
  const windowSize = useWindowSize();
  const changeLayout: number = 600;

  const [fraseRegex, setFraseRegex] = useState<string>("");
  const [showMedicos, setShowMedicos] = useState<IMedicoResponse[]>();

  const { medicos, isLoading } = useMedicosCacheQuery();

  useEffect(() => {
    var removeAcentos = removeAccents(fraseRegex);

    const regEx = new RegExp(`^${removeAcentos}`, "i");
    const filteredItems = medicos?.filter((medico) => {
      return (
        regEx.test(medico.numeroDocumento) ||
        regEx.test(removeAccents(medico.nombre)) ||
        regEx.test(removeAccents(medico.apellido))
      );
    });
    setShowMedicos(filteredItems);
  }, [medicos, fraseRegex]);

  function removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const desktopColumns = [
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "apellido", header: "Apellido" },
    { accessorKey: "numeroDocumento", header: "Documento" },
    { accessorKey: "telefono", header: "Teléfono" },
    { accessorKey: "especialidad", header: "Especialidad" },
  ];
  const mobileColumns =  [
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "apellido", header: "Apellido" },
  ];

  //if is mobile show less colluns to don't break the app
  const columns =
    windowSize.width > changeLayout ? desktopColumns : mobileColumns;

  const table = useReactTable({
    data: showMedicos || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  return (
    <>
      {isLoading && <Spinner msge={spinnerMessages.cargarMedicos} />}
      <div className="p-2 d-flex  flex-column justify-content-center gap-3 ">
        <InputRegex
          placeholder="Buscar medico"
          onFraseRegexChage={setFraseRegex}
        />

        <Table
          striped
          bordered
          hover
          className="text-center align-middle table   table-responsive"
        >
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
                {/* for option icon */}
                <th key="options"></th>
              </tr>
            ))}
          
          </thead>
          <tbody>

              {table.getRowModel().rows.map((row, index) => {
                const cells = row.getVisibleCells();
                const rowData = row.original; // Accede a los datos originales de la fila
  
                return (
                  <tr key={row.id} className="index text-center">
                    <td key={row.id}>{index+1}</td>
  
                    {cells.map(
                      (
                        cell: any //liceseRESPONSE PER ASI FUNCIONA
                      ) => (
                        <td key={cell.getValue()}>{cell.getValue()}</td>
                      )
                    )}
                    <td>
                    <MedicoDropdown medico={rowData} />

                    </td>
                  </tr>
                );
              })}
  
          </tbody>
        </Table>
        <Pagination table={table}/>
      </div>
    </>
  );
}

export default TableMedico;
