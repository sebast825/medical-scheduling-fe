import { useEffect, useState } from "react";
import { useAdministrativoInfoContext, useUserInfo } from "../../context/authContext";
import { useRedirectToLogin } from "../../routes/navigation";
import Opening from "../../Components/General/Opening/Opening";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import TablePaciente from "../../Components/paciente/TablePaciente/TablePaciente";
import useIsSecretario from "../../hooks/roles/useIsSecretario";
import ListaHorariosMedicos from "../../Components/Medico/ListaHorariosMedicos";
import { mensajeBienvenidaPorSexo } from "../../utils/mensajeBienvenidaPorSexo";
import usePacientesCacheQuery from "../../hooks/pacientes/usePacientesCacheQuery";
import { Spinner } from "../../Components/statics/Spinner";

function SecreatarioHome() {
  const isSecretario: Boolean = useIsSecretario();
  const redirectToLogin = useRedirectToLogin();
  const { administrativoInfo } = useAdministrativoInfoContext();
  const [btnToggle, setBtnToggle] = useState<boolean>(true);
  const [preTitle, setPreTitle] = useState<string>("");
const user = useUserInfo()
  const {pacienteList,isLoading} = usePacientesCacheQuery(user);
  useEffect(() => {
    if (!isSecretario) redirectToLogin();
  
  }, []);
  useEffect(() => {
    setPreTitle(mensajeBienvenidaPorSexo(administrativoInfo.sexo));
  }, [administrativoInfo]);

  function ShowPacientes() {
    setBtnToggle(true);
  }

  async function ShowHorariosMedicos() {
    setBtnToggle(false);
  }

  if(isLoading)return <Spinner/>
  return (
    <>
      <Opening title={`${preTitle} ${administrativoInfo.nombre}`} />
      <TwoButtonComponent
        textButton1="Listado Pacientes"
        textButton2="Horarios Medicos"
        onClickButton1={ShowPacientes}
        onClickButton2={ShowHorariosMedicos}
      />
      {btnToggle ? (
        <TablePaciente personaList={pacienteList!} />
      ) : (
        <ListaHorariosMedicos />
      )}
    </>
  );
}

export default SecreatarioHome;
