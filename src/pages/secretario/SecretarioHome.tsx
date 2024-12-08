import { useEffect, useState } from "react";
import {
  usePersonaInfoContext,
  useUserContext,
  useUserInfo
} from "../../context/authContext";
import { useRedirectToLogin } from "../../routes/navigation";
import Opening from "../../Components/General/Opening/Opening";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import TablePaciente from "../../Components/paciente/TablePaciente/TablePaciente";
import useIsSecretario from "../../hooks/roles/useIsSecretario";
import { getDisponibilidadMedicos } from "../../services/apiService";
import { DisponibilidadMedico } from "../../types/DisponibilidadMedico/DisponibilidadMedico";
import agruparObjetosPorClave from "../../utils/AgruparObjetosPorClave";
import HorariosMedico from "../../Components/Medico/HorariosMedico";

function SecreatarioHome() {
  const isSecretario : Boolean = useIsSecretario()
  const user = useUserInfo()
  const redirectToLogin = useRedirectToLogin();
  const { personaInfo } = usePersonaInfoContext();
  const [btnToggle, setBtnToggle] = useState<boolean>(true);


  useEffect(() => {
    if(!isSecretario) redirectToLogin() 

  }, []);

  function ShowPacientes() {
    setBtnToggle(true);
  }
  async function ShowHorariosMedicos() {
    if(user != null){
    var horariosAtencionMedicos : DisponibilidadMedico[]= await getDisponibilidadMedicos(user);

   var agruparHorariosPorMedico =  await agruparObjetosPorClave(horariosAtencionMedicos, "medico")
    console.log(agruparHorariosPorMedico)

    
    await asd(agruparHorariosPorMedico);
  
  
  }
    setBtnToggle(false);
  }

  function asd (grupo: Record<string,DisponibilidadMedico[]>){
  // `Object.entries` devuelve un array de pares [clave, valor]
  Object.entries(grupo).forEach(( [medico,horarios]) => {
    console.log(medico)
      horarios.forEach((horario) => {
        console.log(horario);
      });
    });
   
  }


  return (
    <>
      <Opening title={`Bienvenido Secretario ${personaInfo.nombre}`} />
      <TwoButtonComponent
        textButton1="Listado Pacientes"
        textButton2="Horarios Medicos"
        onClickButton1={ShowPacientes}
        onClickButton2={ShowHorariosMedicos}
      />
      {btnToggle ? <TablePaciente /> : <HorariosMedico />}
    </>
  );
}

export default SecreatarioHome;
