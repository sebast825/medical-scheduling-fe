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
import CardPaciente from "../../Components/paciente/CardPaciente/CardPaciente";
import { useRedirectToLogin } from "../../routes/navigation";
import { usePersonaInfoContext } from "../../context/authContext";
import ConfirmModal from "../../Components/modals/ConfirmModal";
import { formatDate, getDate, getHour } from "../../utils/formatDate";
import TurnosListWithModal from "../../Components/paciente/TurnosListWithModal/TurnosListWithModal";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import List from "../../Components/General/List/List";
import { useNavigate } from "react-router-dom";
import { BuscarPorMedico } from "..";

function PacienteHome() {
  const user = useUserContext();
  const [error, setError] = useState<ErrorTypeAny>(null);
  const [turnos, setTurnos] = useState<TurnoResponse[]>([]);
  const { personaInfo } = usePersonaInfoContext();
  const redirectToLogin = useRedirectToLogin();
  const [btnToggle, setBtnToggle] = useState<boolean>(true);

  const navigate = useNavigate()
  useEffect(() => {
    user == null ? redirectToLogin() : getPacinteTurnos();
  }, []);

  const getPacinteTurnos = async () => {
    try {
      var params: any = GetJwtContent(user);
      const response: TurnoResponse[] = await fetchTurnosPaciente(
        user,
        params.PersonaId
      );
      setTurnos(response);
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message || "Error desconocido");
      } else {
        setError("Error desconocido");
      }
    }
  };

  function ShowTurnos() {
    setBtnToggle(true);
  }
  function ShowNuevoTurno() {
    setBtnToggle(false);
  }
function RedirectBuscarPorMedico(){
  navigate("/buscarMedico")
} 
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
        onClickButton2={ShowNuevoTurno}
        layout="mobileWrap gap-3"
        
      />
       </div>
        </h2>
      )}

      <div>{error && <p className="text-danger">{error}</p>}</div>
    </div>
  );
}

export default PacienteHome;
