import { useEffect } from "react";
import Opening from "../../Components/General/Opening/Opening";
import { useMedicoInfoContext, useUserInfo } from "../../context/authContext";
import useGetTurnos from "../../hooks/turnos/useGetTurnos";
import TurnosListWithModal from "../../Components/turno/TurnosListWithModal/TurnosListWithModal";



function MedicoHome(){

   const {medicoInfo} = useMedicoInfoContext();
   const {getTurnosMedicoById, turnos} = useGetTurnos()
   const user = useUserInfo()

   useEffect(()=>{
      if(medicoInfo == undefined) return
      getTurnosMedicoById(medicoInfo?.id.toString())
         
   },[])





   return(
      <>

      {
         medicoInfo && <Opening title={medicoInfo?.nombre}/>
      }
   <h2>Tus turnos para hoy</h2>
   {
      turnos && 
      turnos.map((turno)=>{
       return  <div>
   <TurnosListWithModal turnosList={turnos} />

         </div>

      })
   }
      </>
   )
}

export default MedicoHome;     /*
<div>{turno.medico}</div>
<div>{turno.paciente}</div>
<div>{turno.estado}</div>

<div>{turno.fechaCreacion.toString()}</div>*/