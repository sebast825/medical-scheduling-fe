import { useEffect, useState } from "react";
import Opening from "../../Components/General/Opening/Opening";
import {
  fetchTurnosPaciente,
  fetchCancelarTurno,
} from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { useUserContext } from "../../context/authContext";
import GetJwtContent from "../../utils/jwtUtils";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { useRedirectToLogin } from "../../routes/navigation";
import { usePersonaInfoContext } from "../../context/authContext";
import TurnosListWithModal from "../../Components/paciente/TurnosListWithModal/TurnosListWithModal";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { ESTADOS_TURNO } from "../../utils/estadoTurno";
import useTurnos from "../../hooks/turnos/UseTurnos";
import useGetTurnos from "../../hooks/turnos/useGetTurnos";


function PacienteHome() {
  const user = useUserContext();
  //const [error, setError] = useState<ErrorTypeAny>(null);
  const { personaInfo } = usePersonaInfoContext();
  const redirectToLogin = useRedirectToLogin();
  const [btnToggle, setBtnToggle] = useState<boolean>(true);

  const {getPacinteTurnos,errorTurno,turnos} = useGetTurnos();
  const location = useLocation();


  const navigate = useNavigate()

  useEffect(() => {
    user == null ? redirectToLogin() : getPacinteTurnos();
    
  }, []);

  useEffect(() => {
    console.log("acaa")
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
      <Opening title={`Bienvenido ${personaInfo.nombre}`} />

      <TwoButtonComponent
        textButton1="Mis Turnos"
        textButton2="Nuevo Turno"
        onClickButton1={ShowTurnos}
        onClickButton2={ShowNuevoTurno}
      />
      {btnToggle ? (
        <div className="container p-4">
          <h2>Mis Turnos</h2>
          <TurnosListWithModal turnosList={turnos} />
        </div>
      ) : (
        <h2>
          <div className="container p-4">
          
          <h2>Nuevo Turno</h2>
          
           <TwoButtonComponent 
        textButton1="Buscar por Medico"
        textButton2="Buscar por Especialidad"
        onClickButton1={RedirectBuscarPorMedico}
        onClickButton2={RedirectBuscarPorEspecialidad}
        layout="mobileWrap gap-3"
        
      />
       </div>
        </h2>
      )}

      <div>{errorTurno && <p className="text-danger">{errorTurno}</p>}</div>
    </div>
  );
}

export default PacienteHome;
