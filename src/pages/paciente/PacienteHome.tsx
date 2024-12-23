import { useEffect, useState } from "react";
import Opening from "../../Components/General/Opening/Opening";
import {  usePacienteContext, useUserInfo } from "../../context/authContext";
import TurnosListWithModal from "../../Components/paciente/TurnosListWithModal/TurnosListWithModal";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import useGetTurnos from "../../hooks/turnos/useGetTurnos";
import useRedirects from "../../hooks/useRedicrects";


function PacienteHome() {
  const user = useUserInfo();
  //const [error, setError] = useState<ErrorTypeAny>(null);
const { pacienteInfo} = usePacienteContext();
  const {redirectToLogin} = useRedirects();
  const [btnToggle, setBtnToggle] = useState<boolean>(true);

  const {getPacinteTurnos,turnos} = useGetTurnos();
  const location = useLocation();


  const navigate = useNavigate()

  useEffect(() => {
    user == null ? redirectToLogin() : getPacinteTurnos();
    
  }, []);
  
  useEffect(() => {
    if (location.state?.refreshTurnos) {
      getPacinteTurnos();
    }
  }, [location.state]);

  function ShowTurnos() {
    setBtnToggle(true);
  }
  function ShowNuevoTurno() {
    setBtnToggle(false);
  }
function RedirectBuscarPorMedico(){
  navigate("/crearTurno/listMedicos")
} 
function RedirectBuscarPorEspecialidad(){
  navigate("/crearTurno/listEspecialidades")} 

  return (
    <div>
      <Opening title={`Bienvenido ${pacienteInfo?.nombre}`} smallOpening={false} />

      <TwoButtonComponent
        textButton1="Mis Turnos"
        textButton2="Nuevo Turno"
        onClickButton1={ShowTurnos}
        onClickButton2={ShowNuevoTurno}
      />
{btnToggle ? (
  <div className="container p-4">
    <h2 className="text-center  mb-4 border-bottom pb-2">Mis Turnos</h2>
    <TurnosListWithModal turnosList={turnos} />
  </div>
) : (
  <div className="container p-4">
    <h2 className="text-center mb-4 border-bottom pb-2">Nuevo Turno</h2>
    <TwoButtonComponent 
      textButton1="Buscar por Medico"
      textButton2="Buscar por Especialidad"
      onClickButton1={RedirectBuscarPorMedico}
      onClickButton2={RedirectBuscarPorEspecialidad}
      layout="mobileWrap gap-3"
    />
  </div>
)}


    </div>
  );
}

export default PacienteHome;
