import { useEffect} from "react";
import InputRegex from "../General/InputRegex/InputRegex";
import EditHorarioMedicoModal from "../modals/horarioMedicoModal/EditHorarioMedicoModal";
import "./ListaHorariosMedicos.scss";
import CreateHorarioMedicoModal from "../modals/horarioMedicoModal/create/CreateHorarioMedicoModal";
import DisponibilidadHorarioCard from "./DisponibilidadHorarioCard/DisponibilidadHorarioCard";
import useDisponibilidadMedicosLogic from "../../hooks/disponibilidadMedicos/useDisponibilidadMedicosLogic";

function ListaHorariosMedicos() {
  const {
    handleInputRegex,
    getMedicos,
    horariosMedicos,
    buscarItem,
    setbuscarItem,
    horariosMedicosFiltrados,
    estadoDisponibilidad,
    setEstadoDisponibilidad,
    handleUpdate,
    handleCreate,
    handleDelete,
    closeEditModal,
    toggleEditModal,
    toggleCreateModal,
    closeCreateModal,
    showEditModal,
    showCreateModal,
  } = useDisponibilidadMedicosLogic();

  useEffect(() => {
    const executeAsyncTask = async () => {
      await getMedicos();
    };
    executeAsyncTask();
  }, []);

  //filtra los medicos
  useEffect(() => {
    handleInputRegex();
  }, [buscarItem, horariosMedicos]);

  return (
    <div className="container d-flex  flex-column justify-content-center gap-3 p-2">
      <InputRegex
        placeholder="Buscar por nombre o especialidad"
        onFraseRegexChage={setbuscarItem}
      />
      <CreateHorarioMedicoModal
        modalField={estadoDisponibilidad}
        show={toggleCreateModal}
        handleClose={closeCreateModal}
        handleConfirm={(e) => handleCreate(e)}
      />
      <EditHorarioMedicoModal
        modalField={estadoDisponibilidad}
        show={toggleEditModal}
        handleClose={closeEditModal}
        handleConfirm={(e) => handleUpdate(e)}
        handleDelete={(e) => handleDelete(e)}
      />
      <div className=" d-flex flex-column flex-md-row  flex-lg-row flex-wrap justify-content-center gap-3">
        {horariosMedicosFiltrados.map(([key, horarios]) => (
          <DisponibilidadHorarioCard
            key={key}
            clave={key}
            horarios={horarios}
            showEditModal={showEditModal}
            showCreateModal={showCreateModal}
            setEditarDisponibilidad={setEstadoDisponibilidad}
          />
        ))}
      </div>
    </div>
  );
}
export default ListaHorariosMedicos;
