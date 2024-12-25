import { useEffect, useState } from "react";
import { useMedicoInfoContext } from "../../../../context/authContext";
import CardItem from "../cardItem/CardItem";
import GenericCard from "../GenericCard/GenericCard";
import useModal from "../../../../hooks/useModal";
import InformacionMedicoModal from "../../../modals/informacionMedicoModal/InformacionMedicoModal";
import { CreateUsuarioRequest } from "../../../../types/usuario/CreateUsuarioRequest";
import CrearUsuarioModal from "../../../modals/usuario/crearUsuarioModal";


interface IUsuarioCard{
   nombre : string,
   email : string
}
function UsuarioCard(props : IUsuarioCard) {
   const {nombre,email} = props;

   const [nombreUsuario,setNombreUsuario] = useState<string>("")
   const [emailusuario,setEmailusuario] = useState<string>("")

    useEffect(()=>{
      setNombreUsuario(nombre)
      setEmailusuario(email)
   },[])

   const{showModal,closeModal,toggleModal} = useModal()
 
   function handleUsuarioResponse(user: CreateUsuarioRequest) {
     console.log("llega");
     console.log(user);
   }
  return (
    <>
  <CrearUsuarioModal
        show={toggleModal}
        handleClose={closeModal}
        handleConfirm={handleUsuarioResponse}
      />
  
    <GenericCard title={"Usuario"} handleEvent={showModal}>
      {true && (
        <>
          <CardItem key={"numLic"} text={nombreUsuario} propertyName="Nombre" />
          <CardItem key={"Especialdiad"} text={emailusuario} propertyName="Email" />
        </>
      )}
    </GenericCard>
    </>
  );
}

export default UsuarioCard;
