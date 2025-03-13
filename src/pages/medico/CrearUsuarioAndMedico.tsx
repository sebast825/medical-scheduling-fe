import { useEffect, useState } from "react";
import usePacienteAndUsuarioCreate from "../../hooks/Usuario/usePacienteAndUsuarioCreate";
import { Button } from "react-bootstrap";
import UsuarioCard from "../../Components/General/Cards/UsuarioCard/UsuarioCard";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import Opening from "../../Components/General/Opening/Opening";
import CreatePacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/CreatePacienteInfoCard";
import OneButton from "../../Components/buttons/oneButton/OneButton";
import useToastit from "../../hooks/useToastit";
import useRedirects from "../../hooks/useRedicrects";
import CreateMedicoInfoCard from "../../Components/General/Cards/MedicoInfoCard/CreateMedicoInfoCard";
import { MedicoUpdateRequestDTO } from "../../types/Medico/MedicoUpdateRequest.type";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";

function CrearUsuarioAndMedico() {
  const {
    showCreateModal,
    setRequiredContext,
    createUserInfo,
    handleUsuarioUpdate,
    pacienteInfo,
    handlePacienteCreate,
    handlePersonaUpdate,
    handleCreateUsuarioAndPaciente,
  } = usePacienteAndUsuarioCreate();

  useEffect(() => {
    setRequiredContext();
    showCreateModal();
  }, []);

  const [isButtonDisabel, setIsButtonDisabel] = useState<boolean>(false);
  useEffect(() => {
    if (isButtonDisabel) {
      //info(genericMessages.procesadoSolicutd);
    }
  }, [isButtonDisabel]);
  const { redirectToLogin } = useRedirects();
  async function handleBtnConfirm() {
    setIsButtonDisabel(true);
    var rsta = await handleCreateUsuarioAndPaciente();
    if (rsta) {
      redirectToLogin();
    } else {
      setIsButtonDisabel(false);
    }
    setTimeout(() => {}, 1000);
  }
  useEffect(() => {}, [isButtonDisabel]);
  const medico: IMedicoResponse = {
    nombre: 'Juan',
    apellido: 'Perez',
    numeroDocumento: '123456789',
    telefono: '987654321',
    sexo: "arjo", // 1: Masculino
    fechaNacimiento: '1990-01-01',
    numeroLicencia: "1234",
    especialidad: "revisa anos",
    id: 0,
    estadoUsuario: "robot"
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
        {pacienteInfo && (
          <CreateMedicoInfoCard
            medicoInfo={medico}
            handleConfirm={function (
              updatedPersona: MedicoUpdateRequestDTO
            ): void {
              throw new Error("Function not implemented.");
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
