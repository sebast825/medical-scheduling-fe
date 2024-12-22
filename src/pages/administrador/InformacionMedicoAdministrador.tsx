import { useMedicoInfoContext } from "../../context/authContext";


function InformacionMedicoAdministrador(){

   const {medicoInfo} = useMedicoInfoContext();
   return<>{medicoInfo?.nombre}</>
}

export default InformacionMedicoAdministrador;