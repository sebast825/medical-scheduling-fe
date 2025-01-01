import { useEffect } from "react";
import Opening from "../../Components/General/Opening/Opening";
import TurnosListWithModal from "../../Components/paciente/TurnosListWithModal/TurnosListWithModal";
import { usePacienteContext, useUserInfo } from "../../context/authContext";
import useGetTurnos from "../../hooks/turnos/useGetTurnos";
import useRedirects from "../../hooks/useRedicrects";
import useIsSecretario from "../../hooks/roles/useIsSecretario";
import TitleContent from "../../Components/General/TitlteContent/TitleContent";
import BackLink from "../../Components/buttons/BackLink/BackLink";
import { genericMessages } from "../../constants/genericMessages";
import useTurnosCacheQuery from "../../hooks/turnos/useTurnosCacheQuery";
import { Spinner } from "../../Components/statics/Spinner";

function TurnosDePaciente() {
  const isSecretario: Boolean = useIsSecretario();
  const { pacienteInfo } = usePacienteContext();
  const { setTurnos } = useGetTurnos();
  const user = useUserInfo();
  const { redirectToLogin } = useRedirects();

  const {turnos,isFetching,handleDeleteCache,handleReloadTurnos,} = useTurnosCacheQuery()
  useEffect(() => {
    if(!isSecretario) redirectToLogin();
    handleReloadTurnos()
  }, []);

  if(isFetching) return <Spinner/>;
  return (
    <>
      <Opening title={`Turnos de ${pacienteInfo?.nombre}`} />
      <div className="pt-4 pb-5 mt-md-4 ">
        {turnos != undefined && turnos.length != 0  ? (
          <TurnosListWithModal turnosList={turnos} handleDelete={handleDeleteCache} />
        ) : (
          <TitleContent title={genericMessages.turnosVacio} pading={false}/>
       
        )}
        <div className="pt-2">
          <BackLink />
        </div>
      </div>
    </>
  );
}

export default TurnosDePaciente;
