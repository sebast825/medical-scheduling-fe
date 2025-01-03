import { useEffect, useState } from "react";
import {
  useAdministrativoInfoContext,
  useUserInfo,} from "../../context/authContext";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import { useRedirectToLogin } from "../../routes/navigation";
import Opening from "../../Components/General/Opening/Opening";
import TableMedico from "../../Components/Medico/TableMedico/TableMedico";
import ListaHorariosMedicos from "../../Components/Medico/ListaHorariosMedicos";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import { mensajeBienvenidaPorSexo } from "../../utils/mensajeBienvenidaPorSexo";
import GetJwtContent from "../../utils/jwtUtils";

function AdministradorHome() {
  const { administrativoInfo } = useAdministrativoInfoContext();
  const isAdministrador = useIsAdministrador();
  const redirectToLogin = useRedirectToLogin();
  const [btnToggle, setBtnToggle] = useState<boolean>(true);
  const [preTitle, setPreTitle] = useState<string>("");
  const user = useUserInfo();
  
  
  useEffect(() => {
    if(user){

      let asd = GetJwtContent(user);

      const expTimestamp = asd.exp;
const expDate = new Date(expTimestamp * 1000); // Multiplicamos por 1000 para convertir de segundos a milisegundos
console.log(expDate); // Imprime la fecha y hora de expiración

    }
    if (!isAdministrador) redirectToLogin();

    setPreTitle(mensajeBienvenidaPorSexo(administrativoInfo.sexo));
    
  }, []);

  function showMedicoslist() {
    setBtnToggle(true);
  }

  async function showHorariosMedicos() {
    setBtnToggle(false);
  }


  return (
    <div className="mb-2 mb-md-5">
      <Opening title={`${preTitle} ${administrativoInfo.nombre}`} />
      <TwoButtonComponent
        textButton1="Listado Medicos"
        textButton2="Horarios Medicos"
        onClickButton1={showMedicoslist}
        onClickButton2={showHorariosMedicos}
      />
      {btnToggle ? <TableMedico /> : <ListaHorariosMedicos />}
    </div>
  );
}

export default AdministradorHome;
