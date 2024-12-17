import { useEffect } from "react";
import Opening from "../../Components/General/Opening/Opening";
import { useMedicoInfoContext, useUserInfo } from "../../context/authContext";
import useGetTurnos from "../../hooks/turnos/useGetTurnos";
import TurnosListWithModalMedico from "../../Components/Medico/TurnosListWithModal/TurnosListWithModalMedico";
import TurnosList from "../../Components/paciente/TurnosList/TurnosList";
import TurnosListMedico from "../../Components/Medico/TurnosList/TurnosListMedico";



function MedicoHome(){

   const {medicoInfo} = useMedicoInfoContext();
   const {getTurnosMedicoById, turnos} = useGetTurnos()
   const user = useUserInfo()

   useEffect(()=>{
      if(medicoInfo == undefined) return
      getTurnosMedicoById(medicoInfo?.id.toString())
         
   },[])




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