import { useEffect, useState } from "react";
import { usePersonaInfoContext, useUserContext, useUserInfo } from "../../context/authContext";
import { useRedirectToLogin } from "../../routes/navigation";
import Opening from "../../Components/General/Opening/Opening";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import TablePaciente from "../../Components/paciente/TablePaciente/TablePaciente";

function SecreatarioHome (){
   const user = useUserInfo();
   const redirectToLogin = useRedirectToLogin();
   const { personaInfo } = usePersonaInfoContext();
   const [btnToggle, setBtnToggle] = useState<boolean>(true);

   useEffect(() => {
      user == null ? redirectToLogin() : console.log("asd");
      
    }, []);


    function ShowPacientes() {
      setBtnToggle(true);
    }
    function ShowHoraiosMedicos() {
      setBtnToggle(false);
    }
   return <>
            <Opening title={`Bienvenido Secretario ${personaInfo.nombre}`} />
<TwoButtonComponent 
   textButton1="Listado Pacientes"
   textButton2="Horarios Medicos"
   onClickButton1={ShowPacientes}
   onClickButton2={ShowHoraiosMedicos}
/>
{
   btnToggle ? (
      <TablePaciente/>
): <h2>HOla</h2>
}
   </>
}

export default SecreatarioHome;