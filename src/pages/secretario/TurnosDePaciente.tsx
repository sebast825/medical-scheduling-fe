import { useEffect } from "react";
import Opening from "../../Components/General/Opening/Opening";
import TurnosListWithModal from "../../Components/turno/TurnosListWithModal/TurnosListWithModal";
import { usePacienteContext, useUserInfo } from "../../context/authContext";
import useGetTurnos from "../../hooks/turnos/useGetTurnos";
import useRedirects from "../../hooks/useRedicrects";
import useIsSecretario from "../../hooks/roles/useIsSecretario";


function TurnosDePaciente(){
   const isSecretario : Boolean = useIsSecretario()
   const { pacienteInfo } = usePacienteContext();
   const {getPacinteTurnos,turnos} = useGetTurnos();
   const user = useUserInfo();
   const {redirectToLogin} = useRedirects();

   useEffect(() => {
      isSecretario ? getPacinteTurnos() : redirectToLogin() ;
      
    }, []);
    
   return(<>
   
   <Opening title={`Turnos de ${pacienteInfo?.nombre}`} />
   <TurnosListWithModal turnosList={turnos} />

  
   

   </>)
}

export default TurnosDePaciente;