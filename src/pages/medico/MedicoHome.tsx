import { useEffect, useState } from "react";
import Opening from "../../Components/General/Opening/Opening";
import { useMedicoInfoContext, useUserInfo } from "../../context/authContext";
import useGetTurnos from "../../hooks/turnos/useGetTurnos";
import TurnosListWithModalMedico from "../../Components/Medico/TurnosListWithModal/TurnosListWithModalMedico";
import TurnosList from "../../Components/paciente/TurnosList/TurnosList";
import TurnosListMedico from "../../Components/Medico/TurnosList/TurnosListMedico";
import useIsMedico from "../../hooks/roles/useIsMedico";
import { useRedirectToLogin } from "../../routes/navigation";
import { mensajeBienvenidaPorSexo } from "../../utils/mensajeBienvenidaPorSexo";

function MedicoHome() {
  const { medicoInfo } = useMedicoInfoContext();
  const isMedico: Boolean = useIsMedico();
  const redirectToLogin = useRedirectToLogin();
  const [preTitle, setPreTitle] = useState<string>();
  useEffect(() => {
    if (!isMedico) redirectToLogin();
  }, []);
  useEffect(() => {
    if (medicoInfo) setPreTitle(mensajeBienvenidaPorSexo(medicoInfo.sexo));
  }, [medicoInfo]);

  return (
    <>
      {medicoInfo && <Opening title={`${preTitle} ${medicoInfo?.nombre}`} />}

      <TurnosListMedico />
    </>
  );
}

export default MedicoHome;
