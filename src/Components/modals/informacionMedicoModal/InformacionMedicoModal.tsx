import { Form } from "react-bootstrap";
import { IMedicoResponse } from "../../../types/MedicoResponse.type";
import GenericModal from "../GenericModal/GenericModal";
import { useState } from "react";


interface IInformacionMedicoModal {
   modalField: IMedicoResponse;
   show: boolean;
   handleClose: () => void;
   handleConfirm: (personaResponse: IMedicoResponse) => void;
 }
 
function InformacionMedicoModal(props: IInformacionMedicoModal) {

   const {modalField,show,handleClose,handleConfirm} = props;
   const [nombre,setNombre] = useState<string>("");

   function confirmar(){

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
