import { useEffect, useState } from "react";
import Opening from "../../Components/General/Opening/Opening";
import { usePacienteContext, useUserInfo } from "../../context/authContext";
import TurnosListWithModal from "../../Components/paciente/TurnosListWithModal/TurnosListWithModal";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import { useNavigate } from "react-router-dom";
import useGetTurnos from "../../hooks/turnos/useGetTurnos";
import useRedirects from "../../hooks/useRedicrects";
import { mensajeBienvenidaPorSexo } from "../../utils/mensajeBienvenidaPorSexo";
import TitleContent from "../../Components/General/TitlteContent/TitleContent";
import useTurnosCacheQuery from "../../hooks/turnos/useTurnosCacheQuery";
import { Spinner } from "../../Components/statics/Spinner";

function PacienteHome() {
  const user = useUserInfo();
  const { pacienteInfo } = usePacienteContext();
  const { redirectToLogin } = useRedirects();
  const [btnToggle, setBtnToggle] = useState<boolean>(true);
  const { getPacinteTurnos ,setTurnos} = useGetTurnos();
  const [preTitle, setPreTitle] = useState<string>("");
  const navigate = useNavigate();

  const {turnos, isLoading} = useTurnosCacheQuery()
 

  useEffect(() => {
    if(user == null) redirectToLogin()
    if (pacienteInfo != undefined)
      setPreTitle(mensajeBienvenidaPorSexo(pacienteInfo.sexo));
  }, []);
  
  function ShowTurnos() {
    setBtnToggle(true);
  }
  function ShowNuevoTurno() {
    setBtnToggle(false);
  }
  function RedirectBuscarPorMedico() {
    navigate("/crearTurno/listMedicos");
  }
  function RedirectBuscarPorEspecialidad() {
    navigate("/crearTurno/listEspecialidades");
  }
  if(isLoading)return <Spinner/>
  return (
    <div>
      <Opening
        title={`${preTitle} ${pacienteInfo?.nombre}`}
        smallOpening={false}
      />

      <TwoButtonComponent
        textButton1="Mis Turnos"
        textButton2="Nuevo Turno"
        onClickButton1={ShowTurnos}
        onClickButton2={ShowNuevoTurno}
      />
      {btnToggle ? (
        <div className="container p-4 pt-0  pt-md-0">
          {turnos != undefined ? (
            <>
              <TitleContent title="Mis Turnos" pading={false} />
              {/* <TurnosListWithModal turnosList={turnos} setTurnos={setTurnos}/> */}
            </>
          ) : (
            <TitleContent title="No tenés turnos agendados" pading={true} />
          )}
        </div>
      ) : (
        <div className="container p-4 pt-0 pt-md-0">
          <TitleContent title="Nuevo Turno" pading={false} />
          <TwoButtonComponent
            textButton1="Buscar por Medico"
            textButton2="Buscar por Especialidad"
            onClickButton1={RedirectBuscarPorMedico}
            onClickButton2={RedirectBuscarPorEspecialidad}
            layout="mobileWrap gap-3 maxWidthContainer"
          />
        </div>
      )}
    </div>
  );
}

export default PacienteHome;
