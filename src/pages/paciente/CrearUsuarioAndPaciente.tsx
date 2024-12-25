import { useEffect } from "react";
import CrearUsuarioModal from "../../Components/modals/usuario/crearUsuarioModal";
import usePacienteAndUsuarioCreate from "../../hooks/Usuario/usePacienteAndUsuarioCreate";
import { CreateUsuarioRequest } from "../../types/usuario/CreateUsuarioRequest";
import OneButton from "../../Components/buttons/oneButton/OneButton";
import { Button } from "react-bootstrap";

function CrearUsuarioAndPaciente() {
  const {
    createUsuarioAndPaciente,
    closeCreateModal,
    showCreateModal,
    toggleCreateModal,
  } = usePacienteAndUsuarioCreate();
  function handleUsuarioResponse(user: CreateUsuarioRequest) {
    console.log("llega");
    console.log(user);
  }
  useEffect(() => {
    showCreateModal();
  }, []);
  
  return (
    <>
      <CrearUsuarioModal
        show={toggleCreateModal}
        handleClose={closeCreateModal}
        handleConfirm={handleUsuarioResponse}
      />
      <br></br>
      <Button onClick={showCreateModal}>asd</Button>
    </>
  );
}

export default CrearUsuarioAndPaciente;
