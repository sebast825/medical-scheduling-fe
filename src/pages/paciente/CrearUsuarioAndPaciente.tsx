import { useEffect } from "react";
import usePacienteAndUsuarioCreate from "../../hooks/Usuario/usePacienteAndUsuarioCreate";
import { Button } from "react-bootstrap";
import UsuarioCard from "../../Components/General/Cards/UsuarioCard/UsuarioCard";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import Opening from "../../Components/General/Opening/Opening";
import CreatePacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/CreatePacienteInfoCard";
import OneButton from "../../Components/buttons/oneButton/OneButton";
import useToastit from "../../hooks/useToastit";


function CrearUsuarioAndPaciente() {
  const {
    showCreateModal,    
    setRequiredContext,
    createUserInfo,
    handleUsuarioUpdate,
    pacienteInfo,       
    handlePacienteCreate,
    handlePersonaUpdate,
    handleCreateUsuarioAndPaciente,errorUsuario
  } = usePacienteAndUsuarioCreate();

 
  useEffect(() => {
    setRequiredContext();
    showCreateModal();
  }, []);

  const { error } = useToastit();
  
  useEffect(() => {
    if (errorUsuario == null) return;
    error(errorUsuario);
  }, [errorUsuario]);

  return (
    <>
      <Opening title={"Crear Usuario"} />
      <div className="container d-flex p-5 flex-column gap-3 flex-md-row justify-content-center align-items-start"
      style={{maxWidth:"1100px"}}
      >
        {createUserInfo && (
          <UsuarioCard
            usuarioInfo={createUserInfo}
            updatedInfo={handleUsuarioUpdate}
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
      <div className="pb-5 ">
        <OneButton text="Crear Cuenta" sizeClass="btn-lg"  customClass="noPaddingMarginTop" variant="warning" handleSubmit={handleCreateUsuarioAndPaciente } />

        </div>
    </>
  );
}

export default CrearUsuarioAndPaciente;
