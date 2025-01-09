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

function TableMedico() {

  const windowSize = useWindowSize();
  const changeLayout: number = 600;

  const [fraseRegex, setFraseRegex] = useState<string>("");
  const [showMedicos, setShowMedicos] = useState<IMedicoResponse[]>();

  const {medicos, isLoading} = useMedicosCacheQuery()


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
  if(isLoading) return <Spinner msge={spinnerMessages.cargarMedicos}/>

  return (
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
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Apellido</th>
            {windowSize.width > changeLayout && (
              <>
                <th>Documento</th>
                <th>Teléfono</th>
                <th>Especialidad</th>
              </>
            )}

            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {showMedicos &&
            showMedicos.map((medico, index) => (
              <tr key={medico.id} className="fontTable">
                <td className="index">{index}</td>

                <td>{medico.nombre}</td>
                <td>{medico.apellido}</td>

                {windowSize.width > changeLayout && (
                  <>
                    <td>{medico.numeroDocumento}</td>
                    <td>{medico.telefono}</td>
                    <td>{medico.especialidad}</td>
                  </>
                )}
                <td className="dropdown ">
                  <MedicoDropdown medico={medico} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableMedico;
