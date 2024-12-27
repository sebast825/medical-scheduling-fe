import { useEffect, useState } from "react";
import { useAdministrativoInfoContext } from "../../context/authContext";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import { useRedirectToLogin } from "../../routes/navigation";
import Opening from "../../Components/General/Opening/Opening";
import TableMedico from "../../Components/Medico/TableMedico/TableMedico";
import ListaHorariosMedicos from "../../Components/Medico/ListaHorariosMedicos";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import TablePaciente from "../../Components/paciente/TablePaciente/TablePaciente";

function AdministradorHome() {
  const { administrativoInfo } = useAdministrativoInfoContext();
  const isAdministrador = useIsAdministrador();
  const redirectToLogin = useRedirectToLogin();
  const [btnToggle, setBtnToggle] = useState<boolean>(true);

  useEffect(() => {
    if (!isAdministrador) redirectToLogin();
  }, []);

  function showMedicoslist() {
    setBtnToggle(true);
  }

  async function showHorariosMedicos() {
    setBtnToggle(false);
  }

  return (
    <>
      <Opening title={`Bienvenido ${administrativoInfo.nombre}`} />
      <TwoButtonComponent
        textButton1="Listado Medicos"
        textButton2="Horarios Medicos"
        onClickButton1={showMedicoslist}
        onClickButton2={showHorariosMedicos}
      />
      {btnToggle ? <TableMedico /> : <ListaHorariosMedicos />}
    </>
  );
}

export default AdministradorHome;
