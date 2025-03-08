import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Table } from "@tanstack/react-table";
interface IPagiation {
  table: Table<any>;
}

function Pagiation({ table }: IPagiation) {
  return (
    <>{table.getPageCount() != 1 &&
      <div className="d-flex align-items-center justify-content-center gap-2">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {" "}
          <FontAwesomeIcon icon={faAnglesLeft} />
        </Button>

        <h5 className="mb-0 d-flex flex-row">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </h5>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </Button>
      </div>}
    </>
  );
}

export default Pagiation;
