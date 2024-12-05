import { useEffect, useState } from "react";
import {
  usePersonaInfoContext
} from "../../context/authContext";
import { useRedirectToLogin } from "../../routes/navigation";
import Opening from "../../Components/General/Opening/Opening";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import TablePaciente from "../../Components/paciente/TablePaciente/TablePaciente";
import useIsSecretario from "../../hooks/validateRol/isSecretario";

function SecreatarioHome() {
  const isSecretario : Boolean = useIsSecretario()

  const redirectToLogin = useRedirectToLogin();
  const { personaInfo } = usePersonaInfoContext();
  const [btnToggle, setBtnToggle] = useState<boolean>(true);


  useEffect(() => {
    if(!isSecretario) redirectToLogin() 

  }, []);

  function ShowPacientes() {
    setBtnToggle(true);
  }
  function ShowHoraiosMedicos() {
    setBtnToggle(false);
  }
  console.log(personaInfo)
  return (
    <>
      <Opening title={`Bienvenido Secretario ${personaInfo.nombre}`} />
      <TwoButtonComponent
        textButton1="Listado Pacientes"
        textButton2="Horarios Medicos"
        onClickButton1={ShowPacientes}
        onClickButton2={ShowHoraiosMedicos}
      />
      {btnToggle ? <TablePaciente /> : <h2>HOla</h2>}
    </>
  );
}

export default SecreatarioHome;
