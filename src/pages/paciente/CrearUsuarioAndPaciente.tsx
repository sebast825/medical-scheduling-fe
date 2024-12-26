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
import { usePacienteContext, usePersonaInfoContext } from "../../context/authContext";
import Opening from "../../Components/General/Opening/Opening";

function CrearUsuarioAndPaciente() {
  const {
    createUsuarioAndPaciente,
    closeCreateModal,
    showCreateModal,
    toggleCreateModal,
    setRequiredContext
  } = usePacienteAndUsuarioCreate();


  const {setPacienteInfo} = usePacienteContext();
  const {setPersonaInfo} = usePersonaInfoContext() 
  function handleUsuarioResponse(user: IPersonaResponse) {
    console.log("llega");
    console.log(user);
  }
  function handlePaciente(user: IPacienteResponse) {
   console.log("llega");
   console.log(user);
 }

  useEffect(() => {
   setRequiredContext()
   
   let paciente: IPacienteResponse = {
      telefonoEmergencia: "adasd",
      nombreEmergencia: "asdaasdasdasdd",
      id: 0,
      nombre: "asd",
      apellido: "asd",
      fechaNacimiento: "11/3/2024",
      telefono: "asdasd",
      numeroDocumento: "asdasdasd",
      sexo: "asdasd",
      estadoUsuario: "asdasdasd",
    };
    setPersonaInfo(paciente);
    //setPacienteInfo(paciente);
    showCreateModal();
  }, []);

  return (
    <>
    <Opening title={"Crear Usuario"}/>
     <div className="container d-flex p-5 justify-content-center align-items-start">
     <UsuarioCard nombre={"nombre"} email={"emailasd"} ></UsuarioCard>
      <PersonaInfoCard handleConfirm={handleUsuarioResponse}/>
      <CreatePacienteInfoCard handleConfirm={ handlePaciente }/>
     </div>
  
      <Button onClick={showCreateModal}>asd</Button>
    </>
  );
}

export default CrearUsuarioAndPaciente;
