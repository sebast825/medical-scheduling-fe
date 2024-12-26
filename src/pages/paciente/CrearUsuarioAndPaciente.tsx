import { useEffect } from "react";
import usePacienteAndUsuarioCreate from "../../hooks/Usuario/usePacienteAndUsuarioCreate";
import { Button } from "react-bootstrap";
import UsuarioCard from "../../Components/General/Cards/UsuarioCard/UsuarioCard";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import Opening from "../../Components/General/Opening/Opening";
import CreatePacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/CreatePacienteInfoCard";


function CrearUsuarioAndPaciente() {
  const {
    showCreateModal,    
    setRequiredContext,
    createUserInfo,
    setCreateUserInfo,
    pacienteInfo,       
    handlePacienteCreate,
    handlePersonaUpdate,
    handleCreateUsuarioAndPaciente
  } = usePacienteAndUsuarioCreate();

 
  useEffect(() => {
    setRequiredContext();
    showCreateModal();
  }, []);

  console.log(createUserInfo);
  useEffect(() => {}, [createUserInfo]);


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

      <Button onClick={()=>handleCreateUsuarioAndPaciente()}>asd</Button>
    </>
  );
}

export default CrearUsuarioAndPaciente;
