import { useEffect, useState } from "react";
import { useUserInfo } from "../../context/authContext";
import { getDisponibilidadMedicos } from "../../services/apiService";
import { DisponibilidadMedico } from "../../types/DisponibilidadMedico/DisponibilidadMedico";
import { agruparObjetosPorClave } from "../../utils/AgruparObjetosPorClave";
import InputRegex from "../General/InputRegex/InputRegex";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import OneButton from "../buttons/oneButton/OneButton";
import HorarioMedicoModal from "../modals/horarioMedicoModal/HorarioMedicoModal";
import useModal from "../../hooks/useModal";
import { text } from "stream/consumers";
import "./ListaHorariosMedicos.scss";
import { IDisponibilidadMedicoUpdateRequest } from "../../types/DisponibilidadMedico/IDisponibilidadMedicoUpdateRequest";
import useDisponibilidadMedicosApi from "../../hooks/disponibilidadMedicos/useDisponibilidadMedicosApi";
import CreateHorarioMedicoModal from "../modals/horarioMedicoModal/create/CreateHorarioMedicoModal";
import { DisponibilidadMedicoCreate } from "../../types/DisponibilidadMedico/DisponibilidadMedicoCreate";
import { idText } from "typescript";
import splitKeyNombreEspecialidad from "../../utils/splitKeyNombreEspecialidad";
import DisponibilidadHorarioCard from "./DisponibilidadHorarioCard/DisponibilidadHorarioCard";

function ListaHorariosMedicos() {
  const user = useUserInfo();
  //record conjunto clave valor
  //clave-> nombremedico-especialidad
  const [horariosMedicos, setHorariosMedicos] = useState<
    Record<string, DisponibilidadMedico[]>
  >({});
  const [buscarItem, setbuscarItem] = useState<string>("");
  const [horariosMedicosFiltrados, setHorariosMedicosFiltrados] = useState<
    [string, DisponibilidadMedico[]][]
  >([]);

  const { showModal, closeModal, toggleModal } = useModal();

  const [editarDisponibilidad, setEditarDisponibilidad] =
    useState<DisponibilidadMedico>({
      id: 0,
      medicoId: 0,
      medico: "",
      especialidad: "",
      diaSemana: "",
      startTime: "",
      endTime: "",
    });

  useEffect(() => {
    const executeAsyncTask = async () => {
      await getMedicos();
    };
    executeAsyncTask();
  }, []);

  //filtra los medicos
  useEffect(() => {
    const regEx = new RegExp(`^${buscarItem}`, "i");
    const filteredItems = Object.entries(horariosMedicos).filter(
      ([key, horarios]) => {
        let splitKey = splitKeyNombreEspecialidad(key);
        return regEx.test(splitKey.nombre) || regEx.test(splitKey.especialidad);
      }
    );
    setHorariosMedicosFiltrados(filteredItems);
  }, [buscarItem, horariosMedicos]);

  async function getMedicos() {
    if (user != null) {
      var horariosAtencionMedicos: DisponibilidadMedico[] =
        await getDisponibilidadMedicos(user);

      var agruparHorariosPorMedico = await agruparObjetosPorClave(
        horariosAtencionMedicos,
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
        Object.entries(horariosMedicos)
          .map(([key, horario]) => [
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



  const {
    fetchUpdateDisponibilidadMedico,
    fetchCreateDisponibilidadMedico,
    fetchDeleteDisponibilidadMedico,
  } = useDisponibilidadMedicosApi();

  async function updateDisponibilidadHorario(
    disponibilidadMedicoUpdated: IDisponibilidadMedicoUpdateRequest
  ) {
    var rsta = await fetchUpdateDisponibilidadMedico(
      disponibilidadMedicoUpdated
    );
    await closeModal();
    if (rsta == undefined) return;
    let updatedList = updateDisponibilidadFromRecord(rsta);
    setHorariosMedicos(updatedList);
  }

  const [toggleCreateModal, setToggleCreateModal] = useState<boolean>(false);

  function closeCreateModal() {
    setToggleCreateModal(false);
  }
  function showCreateModal() {
    setToggleCreateModal(true);
  }

  async function createDisponibilidadHorario(
    disponibilidadMedico: DisponibilidadMedicoCreate
  ) {
    await fetchCreateDisponibilidadMedico(disponibilidadMedico);
    await closeCreateModal();
    await getMedicos();
  }

  async function deleteDisponibilidadHorario(id: number) {
    await fetchDeleteDisponibilidadMedico(id);
    await closeModal();
    let updateList = removeDisponibilidadFromRecord(id);
    setHorariosMedicos(updateList);
  }


  return (
    <div className="container d-flex  flex-column justify-content-center gap-3 p-2">
      <InputRegex
        placeholder="Buscar medico por nombre o especialidad"
        onFraseRegexChage={setbuscarItem}
      />
      <CreateHorarioMedicoModal
        modalField={editarDisponibilidad}
        show={toggleCreateModal}
        handleClose={closeCreateModal}
        handleConfirm={(e) => createDisponibilidadHorario(e)}
      />
      <HorarioMedicoModal
        modalField={editarDisponibilidad}
        show={toggleModal}
        handleClose={closeModal}
        handleConfirm={(e) => updateDisponibilidadHorario(e)}
        handleDelete={(e) => deleteDisponibilidadHorario(e)}
      />
      <div className=" d-flex flex-column flex-lg-row justify-content-center gap-3">
        {horariosMedicosFiltrados.map(([key, horarios]) => (
          
          <DisponibilidadHorarioCard key={key} clave={key} horarios={horarios} showModal={showModal}
          showCreateModal={showCreateModal} setEditarDisponibilidad={setEditarDisponibilidad} />
        ))}
      </div>
    </div>
  );
}
export default ListaHorariosMedicos;
