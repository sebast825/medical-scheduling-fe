import { useEffect, useState } from "react";
import { DisponibilidadMedico } from "../../types/DisponibilidadMedico/DisponibilidadMedico";
import splitKeyNombreEspecialidad from "../../utils/splitKeyNombreEspecialidad";
import { useUserInfo } from "../../context/authContext";
import { agruparObjetosPorClave } from "../../utils/AgruparObjetosPorClave";
import { DisponibilidadMedicoCreate } from "../../types/DisponibilidadMedico/DisponibilidadMedicoCreate";
import { IDisponibilidadMedicoUpdateRequest } from "../../types/DisponibilidadMedico/IDisponibilidadMedicoUpdateRequest";
import useDisponibilidadMedicosApi from "./useDisponibilidadMedicosApi";
import useDisponibilidadMedicosCacheQuery from "./useDisponibilidadMedicosCacheQuery";

function useDisponibilidadMedicosLogic() {
  const user = useUserInfo();

  const [horariosMedicos, setHorariosMedicos] = useState<
    Record<string, DisponibilidadMedico[]>
  >({});
  const [buscarItem, setbuscarItem] = useState<string>("");
  const [horariosMedicosFiltrados, setHorariosMedicosFiltrados] = useState<
    [string, DisponibilidadMedico[]][]
  >([]);
  const [estadoDisponibilidad, setEstadoDisponibilidad] =
  useState<DisponibilidadMedico>({
    id: 0,
    medicoId: 0,
    medico: "",
    especialidad: "",
    diaSemana: "",
    startTime: "",
    endTime: "",
  });
  const {
   fetchUpdateDisponibilidadMedico,
   fetchCreateDisponibilidadMedico,
   fetchDeleteDisponibilidadMedico,
 } = useDisponibilidadMedicosApi();

 const {disponibilidadMedico,handleDeleteCache} = useDisponibilidadMedicosCacheQuery()
  const [toggleCreateModal, setToggleCreateModal] = useState<boolean>(false);
  const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);

  function closeEditModal() {
    setToggleEditModal(false);
  }
  function showEditModal() {
    setToggleEditModal(true);
  }
  function closeCreateModal() {
    setToggleCreateModal(false);
  }
  function showCreateModal() {
    setToggleCreateModal(true);
  }

  function handleInputRegex() {
    const regEx = new RegExp(`^${buscarItem}`, "i");
    const filteredItems = Object.entries(horariosMedicos).filter(
      ([key, horarios]) => {
        let splitKey = splitKeyNombreEspecialidad(key);
        return regEx.test(splitKey.nombre) || regEx.test(splitKey.especialidad);
      }
    );
    setHorariosMedicosFiltrados(filteredItems);
  }
  async function getMedicos() {
    if (user != null) {
      if(!disponibilidadMedico)return;
      var agruparHorariosPorMedico = await agruparObjetosPorClave(
        disponibilidadMedico,
        "medico",
        "especialidad"
      );

      setHorariosMedicos(agruparHorariosPorMedico);
    }
  }

  function removeDisponibilidadFromRecord(
    id: number
  ): Record<string, DisponibilidadMedico[]> {
    const newRecord: Record<string, DisponibilidadMedico[]> =
      //from entries lo vuelve a covertir a u objeto
      Object.fromEntries(
        Object.entries(horariosMedicos)
          .map(([key, horario]) => [
            key,
            horario.filter((elem) => elem.id != id),
          ])
          //remueve el elemento si no tiene valores
          .filter(([key, value]) => value.length != 0)
      );
    return newRecord;
  }

  function updateDisponibilidadFromRecord(
    dto: DisponibilidadMedico
  ): Record<string, DisponibilidadMedico[]> {
    const newRecord: Record<string, DisponibilidadMedico[]> =
      Object.fromEntries(
        Object.entries(horariosMedicos).map(([key, horario]) => [
          key,
          horario.map((elem) =>
            elem.id === dto.id
              ? { ...elem, startTime: dto.startTime, endTime: dto.endTime }
              : elem
          ),
        ])
      );
    return newRecord;
  }

  async function handleUpdate(
    disponibilidadMedicoUpdated: IDisponibilidadMedicoUpdateRequest
  ) {
    var rsta = await fetchUpdateDisponibilidadMedico(
      disponibilidadMedicoUpdated
    );
    await closeEditModal();
    if (rsta == undefined) return;
    let updatedList = updateDisponibilidadFromRecord(rsta);
    setHorariosMedicos(updatedList);
  }

  async function handleCreate(
    disponibilidadMedico: DisponibilidadMedicoCreate
  ) {
    await fetchCreateDisponibilidadMedico(disponibilidadMedico);
    await closeCreateModal();
    await getMedicos();
  }

  async function handleDelete(id: number) {
    await fetchDeleteDisponibilidadMedico(id);
    await closeEditModal();
    let updateList = removeDisponibilidadFromRecord(id);
    setHorariosMedicos(updateList);
    handleDeleteCache(id);
  }

  return {
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
  };
}

export default useDisponibilidadMedicosLogic;
