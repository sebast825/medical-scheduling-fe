import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import UsuarioCard from "../../Components/General/Cards/UsuarioCard/UsuarioCard";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import Opening from "../../Components/General/Opening/Opening";

import useRedirects from "../../hooks/useRedicrects";

import useCreateSecretarioAndUsuario from "../../hooks/Usuario/secretario/useCreateMedicoAndUsuario";
import { info } from "toastr";
import { genericMessages } from "../../constants/genericMessages";
import { useUserToggleContext } from "../../context/authContext";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";

function CrearUsuarioAndMedico() {
  const {
    showCreateModal,
    setRequiredContext,
    createUserInfo,
    handleUsuarioUpdate,
    handlePersonaUpdate,
    handlecreateUsuarioAndSecretario,
  } = useCreateSecretarioAndUsuario();
  const isAdministrador = useIsAdministrador();

  const login = useUserToggleContext();

  useEffect(() => {
    if (!isAdministrador) {
      redirectToLogin();
      return;
    }
    setRequiredContext();
    showCreateModal();
  }, []);

  const [isButtonDisabel, setIsButtonDisabel] = useState<boolean>(false);
  useEffect(() => {
    if (isButtonDisabel) {
      info(genericMessages.procesadoSolicutd);
    }
  }, [isButtonDisabel]);

  const { redirectToLogin } = useRedirects();
  async function handleBtnConfirm() {
    setIsButtonDisabel(true);
    var rsta = await handlecreateUsuarioAndSecretario();
    if (rsta) {
      login(null);
      redirectToLogin();
    } else {
      setIsButtonDisabel(false);
    }
    setTimeout(() => {}, 1000);
  }


  return (
    <>
      <Opening title={"Crear Secretario"} />
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
