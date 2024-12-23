import { useEffect, useState } from "react";
import {
  useAdministrativoInfoContext
} from "../../context/authContext";
import { useRedirectToLogin } from "../../routes/navigation";
import Opening from "../../Components/General/Opening/Opening";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import TablePaciente from "../../Components/paciente/TablePaciente/TablePaciente";
import useIsSecretario from "../../hooks/roles/useIsSecretario";
import ListaHorariosMedicos from "../../Components/Medico/ListaHorariosMedicos";

function SecreatarioHome() {
  const isSecretario : Boolean = useIsSecretario()
  const redirectToLogin = useRedirectToLogin();
  const { administrativoInfo } = useAdministrativoInfoContext();
  const [btnToggle, setBtnToggle] = useState<boolean>(true);


  useEffect(() => {
    if(!isSecretario) redirectToLogin() 

  }, []);

  function ShowPacientes() {
    setBtnToggle(true);
  }

  async function ShowHorariosMedicos() {
 
    setBtnToggle(false);
  }

 

  return (
    <>
      <Opening title={`Bienvenido Secretario ${administrativoInfo.nombre}`} customOpen="miniOpening" />
      <TwoButtonComponent
        textButton1="Listado Pacientes"
        textButton2="Horarios Medicos"
        onClickButton1={ShowPacientes}
        onClickButton2={ShowHorariosMedicos}
      />
      {btnToggle ? <TablePaciente /> : <ListaHorariosMedicos />}
    </>
  );
}

export default SecreatarioHome;
