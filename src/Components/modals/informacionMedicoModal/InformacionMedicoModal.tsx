import { Form } from "react-bootstrap";
import { IMedicoResponse } from "../../../types/Medico/MedicoResponse.type";
import GenericModal from "../GenericModal/GenericModal";
import { useEffect, useState } from "react";
import useMedicos from "../../../hooks/medicos/useMedicos";
import { useMedicoInfoContext } from "../../../context/authContext";


interface IInformacionMedicoModal {
   show: boolean;
   handleClose: () => void;
   handleConfirm: (personaResponse: IMedicoResponse) => void;
 }
 
function InformacionMedicoModal(props: IInformacionMedicoModal) {

   const {show,handleClose,handleConfirm} = props;
   const [nombre,setNombre] = useState<string>("");
   const {medicoInfo}= useMedicoInfoContext()
  const {updateMedicos}= useMedicos()

  useEffect(()=>{
      if(medicoInfo != undefined)
    
    setNombre(medicoInfo?.numeroLicencia)},[])
   function confirmar(){
      //await useMedicos()
   }
  return (
   <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={confirmar}
        title="Editar Información Personal"
      >
        <Form className="d-flex flex-column" style={{ gap: "10px" }}>
          <Form.Group controlId="formBasicnombre" >
            <Form.Label style={{ textAlign: "left" }}>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />
          </Form.Group>
          
        </Form>
      </GenericModal>

  )
}

export default InformacionMedicoModal;
