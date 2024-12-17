import { useEffect } from "react";
import Opening from "../../Components/General/Opening/Opening";
import { useMedicoInfoContext, useUserInfo } from "../../context/authContext";
import useMedicos from "../../hooks/medicos/useMedicos";



function MedicoHome(){

   const {medicoInfo} = useMedicoInfoContext();
   const {getTurnosById, turnosMedicos} = useMedicos()
   const user = useUserInfo()

   useEffect(()=>{
      if(medicoInfo == undefined) return
         getTurnosById(medicoInfo?.id.toString())
         
   },[])





   return(
      <>

      {
         medicoInfo && <Opening title={medicoInfo?.nombre}/>
      }
   <h2>Tus turnos para hoy</h2>
   {
      turnosMedicos && 
      turnosMedicos.map((turno)=>{
       return  <div>

     
         <div>{turno.medico}</div>
         <div>{turno.paciente}</div>
         <div>{turno.estado}</div>

         <div>{turno.fechaCreacion.toString()}</div>
         </div>

      })
   }
      </>
   )
}

export default MedicoHome;