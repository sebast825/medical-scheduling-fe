import { useEffect } from "react";
import Opening from "../../Components/General/Opening/Opening";
import { useMedicoInfoContext, useUserInfo } from "../../context/authContext";
import useGetTurnos from "../../hooks/turnos/useGetTurnos";
import TurnosListWithModalMedico from "../../Components/Medico/TurnosListWithModal/TurnosListWithModalMedico";
import TurnosList from "../../Components/paciente/TurnosList/TurnosList";
import TurnosListMedico from "../../Components/Medico/TurnosList/TurnosListMedico";
import useIsMedico from "../../hooks/roles/useIsMedico";
import { useRedirectToLogin } from "../../routes/navigation";



function MedicoHome(){

   const {medicoInfo} = useMedicoInfoContext();
   const isMedico  : Boolean = useIsMedico()
  const redirectToLogin = useRedirectToLogin();


   useEffect(() => {
      if(!isMedico) redirectToLogin() 
  
    }, []);



//   <TurnosListWithModalMedico turnosList={turnos}/>

   return(
      <>

      {
         medicoInfo && <Opening title={medicoInfo?.nombre}/>
      }
   <h2>Tus turnos para hoy</h2>

<TurnosListMedico></TurnosListMedico>

      </>
   )
}

export default MedicoHome;


function redirectToLogin() {
   throw new Error("Function not implemented.");
}
/*
   {
      turnos && 
      turnos.map((turno)=>{
       return 



  
     <div>   <div>{turno.medico}</div>
         <div>{turno.paciente}</div>
         <div>{turno.estado}</div>

         <div>{turno.fechaCreacion.toString()}</div>
         </div>    })
   } */