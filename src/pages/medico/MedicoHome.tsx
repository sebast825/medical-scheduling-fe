import { useEffect } from "react";
import Opening from "../../Components/General/Opening/Opening";
import { useMedicoInfoContext } from "../../context/authContext";



function MedicoHome(){

   const {medicoInfo} = useMedicoInfoContext();

   useEffect(()=>{console.log(medicoInfo)},[])
   return(
      <>

      {
         medicoInfo && <Opening title={medicoInfo?.nombre}/>
      }
   
      </>
   )
}

export default MedicoHome;