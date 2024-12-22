import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import "./TableMedico.scss";
import useWindowSize from "../../../hooks/ScreenSize";

import InputRegex from "../../General/InputRegex/InputRegex";
import useIsSecretario from "../../../hooks/roles/useIsSecretario";
import useIsAdministrador from "../../../hooks/roles/useIsAdministrador";
import OneButton from "../../buttons/oneButton/OneButton";
import useModal from "../../../hooks/useModal";
import useMedicos from "../../../hooks/medicos/useMedicos";
import { IMedicoResponse } from "../../../types/MedicoResponse.type";
import MedicoDropdown from "../../Dropdown/Admin/MedicoDropdown";

function TableMedico() {
  const { getMedicos, medicos } = useMedicos();

  const windowSize = useWindowSize();
  const changeLayout: number = 600;

  const [fraseRegex, setFraseRegex] = useState<string>("");
  const [showMedicos, setShowMedicos] = useState<IMedicoResponse[]>();
  const isSecretario = useIsSecretario();
  const isAdmin = useIsAdministrador();

  const { showModal, closeModal, toggleModal } = useModal();

  useEffect(() => {
    if (medicos != undefined) return;

    getMedicos();
  }, [medicos]);


  useEffect(() => {
    var removeAcentos = removeAccents(fraseRegex);

    console.log(removeAcentos);
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

  return (
    <div className="p-2 d-flex  flex-column justify-content-center gap-3 ">
      <InputRegex
        placeholder="Buscar medico por documento"
        onFraseRegexChage={setFraseRegex}
      />

      <Table
        striped
        bordered
        hover
        table-responsive
        className="text-center align-middle table"
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
              <tr key={medico.id}>
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
                  {/* <ChangeStatusPersona
                    modalField={medico}
                    show={toggleModal}
                    handleClose={closeModal}
                    handleConfirm={(e:IPersonaResponse)=>RemovemedicoNotActive(e)}  />
                    */}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableMedico;
