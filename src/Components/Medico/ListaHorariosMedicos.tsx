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
import useDisponibilidadMedicosLogic from "../../hooks/disponibilidadMedicos/useDisponibilidadMedicosLogic";

function ListaHorariosMedicos() {
  //record conjunto clave valor
  //clave-> nombremedico-especialidad

  const {
    handleInputRegex,
    getMedicos,
    horariosMedicos,
    buscarItem,
    setbuscarItem,
    horariosMedicosFiltrados,
    editarDisponibilidad,
    setEditarDisponibilidad,
    updateDisponibilidadHorario,
    createDisponibilidadHorario,
    deleteDisponibilidadHorario,
    closeModal,
    toggleModal,
    toggleCreateModal,
    closeCreateModal,
    showModal,showCreateModal
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
          <DisponibilidadHorarioCard
            key={key}
            clave={key}
            horarios={horarios}
            showModal={showModal}
            showCreateModal={showCreateModal}
            setEditarDisponibilidad={setEditarDisponibilidad}
          />
        ))}
      </div>
    </div>
  );
}
export default ListaHorariosMedicos;
