import { Form } from "react-bootstrap";
import { DisponibilidadMedico } from "../../../types/DisponibilidadMedico/DisponibilidadMedico";
import GenericModal from "../GenericModal/GenericModal";
import { useEffect, useState } from "react";

interface IHorarioMedicoModal {
   modalField: DisponibilidadMedico;
   show: boolean;
   handleClose: () => void;
   handleConfirm: (personaResponse: DisponibilidadMedico) => void;
 }
 
function HorarioMedicoModal({ modalField,
   show,
   handleClose,
   handleConfirm,
 }:IHorarioMedicoModal){

   function confirmar(){
      console.log("confirado")
   }
   const [nombre,setNombre] =useState<string>(modalField.diaSemana);
   return(
      <>
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
</>
   )
}

export default HorarioMedicoModal;