import { useEffect, useState } from "react";
import {
  useCreateUserInfoContext,
  useMedicoInfoContext,
} from "../../../../context/authContext";
import CardItem from "../cardItem/CardItem";
import GenericCard from "../GenericCard/GenericCard";
import useModal from "../../../../hooks/useModal";
import InformacionMedicoModal from "../../../modals/informacionMedicoModal/InformacionMedicoModal";
import { CreateUsuarioRequest } from "../../../../types/usuario/CreateUsuarioRequest";
import CrearUsuarioModal from "../../../modals/usuario/crearUsuarioModal";
import { userInfo } from "os";

interface IUsuarioCard {
  usuarioInfo: CreateUsuarioRequest;
  updatedInfo : (e :CreateUsuarioRequest)=>void
}
function UsuarioCard(props: IUsuarioCard) {
  const { usuarioInfo, updatedInfo } = props;

  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [emailusuario, setEmailusuario] = useState<string>("");

  useEffect(() => {
    setNombreUsuario(usuarioInfo.UserName);
    setEmailusuario(usuarioInfo.Email);
  }, [usuarioInfo]);



  const { showModal, closeModal, toggleModal } = useModal();

  function handleUsuarioResponse(user: CreateUsuarioRequest) {
 
    updatedInfo(user)
    closeModal();
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
            <CardItem
              key={"numLic"}
              text={nombreUsuario}
              propertyName="Nombre"
            />
            <CardItem
              key={"Especialdiad"}
              text={emailusuario}
              propertyName="Email"
            />
          </>
        )}
      </GenericCard>
    </>
  );
}

export default UsuarioCard;
