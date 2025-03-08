import { useEffect, useState } from "react";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import CardPaciente from "../CardTurno/CardTurno";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Pagination from "../../General/Pagination/Pagination";

interface ITurnosList {
  turnos: TurnoResponse[];
  handleOpenModal?: (turno: TurnoResponse) => void;
}

function TurnosList(props: ITurnosList) {
  const { turnos, handleOpenModal } = props;

  //if is mobile show less colluns to don't break the app
  const columns = [{ accessorKey: "id", header: "id" }];

  const table = useReactTable({
    data: turnos || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        {table.getRowModel().rows.map((row, index) => {
          const cells = row.getVisibleCells();
          const rowData = row.original; // Accede a los datos originales de la fila

          return (
            <CardPaciente
              key={row.id}
              turno={rowData}
              btnEvent={
                handleOpenModal ? () => handleOpenModal(rowData) : undefined
              }
            />
          );
        })}
        <Pagination table={table} />
      </div>
    </>
  );
}

export default TurnosList;
