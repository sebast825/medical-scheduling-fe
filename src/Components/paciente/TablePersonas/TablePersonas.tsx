import { useEffect, useState } from "react";
import usePacientes from "../../../hooks/pacientes/usePacientes";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { ButtonGroup, Table } from "react-bootstrap";
import { getDate } from "../../../utils/formatDate";
import "./TablePersonas.scss";
import useWindowSize from "../../../hooks/ScreenSize";

import InputRegex from "../../General/InputRegex/InputRegex";
import PacienteDropdown from "../../Dropdown/Secretario/PacienteDropdown";
import useIsSecretario from "../../../hooks/roles/useIsSecretario";
import useIsAdministrador from "../../../hooks/roles/useIsAdministrador";
import OneButton from "../../buttons/oneButton/OneButton";
import ChangeStatusPersona from "../../modals/changeStatusPeronsa/ChangeStatusPersona";
import useModal from "../../../hooks/useModal";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  CellContext,
} from "@tanstack/react-table";
import { getValue } from "@testing-library/user-event/dist/utils";
import Pagination from "../../General/Pagination/Pagination";

interface ITablePersonas {
  personaList: IPersonaResponse[] | IPacienteResponse[];
  handleAction?: (e: IPersonaResponse) => void;
}

function TablePersonas(props: ITablePersonas) {
  const { personaList, handleAction } = props;

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
  const columns = [
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "apellido",
      header: "Apellido",
    },
    {
      accessorKey: "numeroDocumento",
      header: "Documento",
    },
    {
      accessorKey: "telefono",
      header: "Teléfono",
    },
    {
      accessorKey: "fechaNacimiento",
      header: "Fecha Nacimiento",
    },
  ];
  const table = useReactTable({
    data: personaList || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
        className="text-center align-middle table  table-responsive"
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-center">
              <th key="index"> </th>

              {headerGroup.headers.map((header: any) => (
                <th key={header.column.columnDef.header}>
                  {header.column.columnDef.header}
                </th>
              ))}
              <th key="role">{isAdmin ? "Cambiar Estado" : "Opciones"}</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {showPersonas &&
            table.getRowModel().rows.map((row, index) => {
              const cells = row.getVisibleCells();
              const rowData = row.original; // Accede a los datos originales de la fila
              console.log(rowData);
              return (
                <tr key={row.id} className="text-center">
                  <td key={row.id}>{row.id}</td>
                  {cells.map((cell: any) => {
                    var accessorKey = cell.column.id;
                    if (accessorKey == "fechaNacimiento") {
                      return (
                        <td key={cell.getValue()}>
                          {getDate(cell.getValue())}
                        </td>
                      );
                    } else {
                      return <td key={cell.getValue()}>{cell.getValue()}</td>;
                    }
                  })}

                  <td className="dropdown ">
                    {isSecretario && isPacienteResponse(rowData) && (
                      <PacienteDropdown paciente={rowData} />
                    )}
                    {isAdmin && !isPacienteResponse(rowData) && (
                      <OneButton
                        handleSubmit={() => {
                          setSelectedPersona(rowData);
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
                        handleConfirm={(e: IPersonaResponse) => handleAction(e)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Pagination table={table} />
    </div>
  );
}

export default TablePersonas;
