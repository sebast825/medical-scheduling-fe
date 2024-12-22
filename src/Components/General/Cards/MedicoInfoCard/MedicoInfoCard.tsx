import { useEffect, useState } from "react";
import { useMedicoInfoContext } from "../../../../context/authContext";
import CardItem from "../cardItem/CardItem";
import GenericCard from "../GenericCard/GenericCard";

function MedicoInfoCard() {

   const {medicoInfo} = useMedicoInfoContext()
   const [numeroLicencia,setNumeroLicencia] = useState<string>("")
   const [especialidad,setEspecialidad] = useState<string>("")
    useEffect(()=>{
      if (!medicoInfo)return;
      setNumeroLicencia(medicoInfo.numeroLicencia)
      setEspecialidad(medicoInfo.especialidad)
   },[])
  return (
    <GenericCard title={"Información Profesional"} handleEvent={() => {}}>
      {true && (
        <>
          <CardItem key={"numLic"} text={numeroLicencia} propertyName="Numero Licencia" />
          <CardItem key={"Especialdiad"} text={especialidad} propertyName="Especialidad" />
        </>
      )}
    </GenericCard>
  );
}

export default MedicoInfoCard;
