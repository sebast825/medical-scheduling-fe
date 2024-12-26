import { useEffect } from "react";
import CrearUsuarioModal from "../../Components/modals/usuario/crearUsuarioModal";
import usePacienteAndUsuarioCreate from "../../hooks/Usuario/usePacienteAndUsuarioCreate";
import { CreateUsuarioRequest } from "../../types/usuario/CreateUsuarioRequest";
import OneButton from "../../Components/buttons/oneButton/OneButton";
import { Button } from "react-bootstrap";
import UsuarioCard from "../../Components/General/Cards/UsuarioCard/UsuarioCard";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import CreatePacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/CreatePacienteInfoCard";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";
import {
  usePacienteContext,
  usePersonaInfoContext,
} from "../../context/authContext";
import Opening from "../../Components/General/Opening/Opening";
import usePacientes from "../../hooks/pacientes/usePacientes";
import usePersonas from "../../hooks/personas/usePersonas";
import { IPacienteUpdate } from "../../types/Paciente/PacienteUpdate.type";

function CrearUsuarioAndPaciente() {
  const {
    createUsuarioAndPaciente,
    closeCreateModal,
    showCreateModal,
    toggleCreateModal,
    setRequiredContext,
    createUserInfo,
    setCreateUserInfo,
    pacienteInfo,
    setPacienteInfo,
    pacienteCreate,
    handlePacienteCreate,
  } = usePacienteAndUsuarioCreate();

  const { handlePersonaUpdate } = usePersonas();

  function handleUsuarioResponse(user: IPersonaResponse) {
    console.log("llega");
    console.log(user);
  }
  function handlePaciente(user: IPacienteResponse) {
    console.log("llega");
    console.log(user);
  }

  useEffect(() => {
    setRequiredContext();
    showCreateModal();
  }, []);
  
  console.log(createUserInfo);
  useEffect(() => {}, [createUserInfo]);

  function udpatePacienteApi(paciente: IPacienteUpdate) {}

  return (
    <>
      <Opening title={"Crear Usuario"} />
      <div className="container d-flex p-5 justify-content-center align-items-start">
        {createUserInfo && (
          <UsuarioCard
            usuarioInfo={createUserInfo}
            updatedInfo={setCreateUserInfo}
          ></UsuarioCard>
        )}
        <PersonaInfoCard handleConfirm={handlePersonaUpdate} />
        {pacienteInfo && (
          <CreatePacienteInfoCard
            pacienteInfo={pacienteInfo}
            handleConfirm={handlePacienteCreate}
          />
        )}
      </div>

      <Button onClick={showCreateModal}>asd</Button>
    </>
  );
}

export default CrearUsuarioAndPaciente;
