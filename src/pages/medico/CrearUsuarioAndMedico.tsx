import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import UsuarioCard from "../../Components/General/Cards/UsuarioCard/UsuarioCard";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import Opening from "../../Components/General/Opening/Opening";

import useRedirects from "../../hooks/useRedicrects";
import CreateMedicoInfoCard from "../../Components/General/Cards/MedicoInfoCard/CreateMedicoInfoCard";
import useCreateMedicoAndUsuario from "../../hooks/Usuario/medico/useCreateMedicoAndUsuario";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import { genericMessages } from "../../constants/genericMessages";
import useToastit from "../../hooks/useToastit";
import { useUserToggleContext } from "../../context/authContext";

function CrearUsuarioAndMedico() {
  const {
    showCreateModal,
    setRequiredContext,
    createUserInfo,
    handleUsuarioUpdate,
    medicoInfo,
    handlePersonaUpdate,
    handleCreateUsuarioAndPaciente,
    handleMedicoInfo,
  } = useCreateMedicoAndUsuario();
  const isAdministrador = useIsAdministrador();
  const { redirectToLogin } = useRedirects();
  const { info } = useToastit();
  const [isButtonDisabel, setIsButtonDisabel] = useState<boolean>(false);
  const login = useUserToggleContext();

  useEffect(() => {
    if (!isAdministrador) {
      redirectToLogin();
      return;
    }
    setRequiredContext();
    showCreateModal();
  }, []);

  useEffect(() => {
    if (isButtonDisabel) {
      info(genericMessages.procesadoSolicutd);
    }
  }, [isButtonDisabel]);

  async function handleBtnConfirm() {
    setIsButtonDisabel(true);
    var rsta = await handleCreateUsuarioAndPaciente();
    if (rsta) {
      login(null)
      redirectToLogin();
    } else {
      setIsButtonDisabel(false);
    }
    setTimeout(() => {}, 1000);
  }

  return (
    <>
      <Opening title={"Crear Usuario"} />
      <div
        className="container d-flex pt-5 pb-5 flex-column gap-3 flex-md-row justify-content-center align-items-start"
        style={{ maxWidth: "1100px" }}
      >
        {createUserInfo && (
          <UsuarioCard
            usuarioInfo={createUserInfo}
            updatedInfo={handleUsuarioUpdate}
          ></UsuarioCard>
        )}
        <PersonaInfoCard handleConfirm={handlePersonaUpdate} />
        {medicoInfo && (
          <CreateMedicoInfoCard
            medicoInfo={medicoInfo}
            handleConfirm={(e) => {
              handleMedicoInfo(e);
            }}
          />
        )}
      </div>
      <div className="pb-5 d-flex justify-content-center">
        <Button
          variant="warning"
          className="btn-lg"
          onClick={() => handleBtnConfirm()}
          disabled={isButtonDisabel}
        >
          {isButtonDisabel ? "Solicitud Enviada" : "Crear Cuenta"}
        </Button>
        {/* <OneButton text="Crear Cuenta" sizeClass="btn-lg"  disabled={isButtonDisabel} variant="warning" handleSubmit={handleCreateUsuarioAndPaciente } /> */}
      </div>
    </>
  );
}

export default CrearUsuarioAndMedico;
