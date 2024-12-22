import { useEffect, useState } from "react";
import { useMedicoInfoContext } from "../../../../context/authContext";
import CardItem from "../cardItem/CardItem";
import GenericCard from "../GenericCard/GenericCard";
import useModal from "../../../../hooks/useModal";
import InformacionMedicoModal from "../../../modals/informacionMedicoModal/InformacionMedicoModal";

function MedicoInfoCard() {

   const {medicoInfo} = useMedicoInfoContext()
   const [numeroLicencia,setNumeroLicencia] = useState<string>("")
   const [especialidad,setEspecialidad] = useState<string>("")
    useEffect(()=>{
      if (!medicoInfo)return;
      setNumeroLicencia(medicoInfo.numeroLicencia)
      setEspecialidad(medicoInfo.especialidad)
   },[medicoInfo])

   const{showModal,closeModal,toggleModal} = useModal()
 
  return (
    <>
       <InformacionMedicoModal  show={toggleModal} handleClose={closeModal } handleConfirm={()=>console.log("hola")}/>

  
    <GenericCard title={"Información Profesional"} handleEvent={showModal}>
      {true && (
        <>
          <CardItem key={"numLic"} text={numeroLicencia} propertyName="Numero Licencia" />
          <CardItem key={"Especialdiad"} text={especialidad} propertyName="Especialidad" />
        </>
      )}
    </GenericCard>
    </>
  );
}

export default MedicoInfoCard;
