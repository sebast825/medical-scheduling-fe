import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IGenericObject } from "../../../types/IGenericObject.type";
import useManageObjectList from "../../../hooks/objectField/useManageObjectList";
import GenericModal from "../GenericModal/GenericModal";
import FormInput from "../formInput/formInput";
import {
  usePacienteContext,
  usePersonaInfoContext,
} from "../../../context/authContext";
import { IPersonaUpdate } from "../../../types/Persona/PersonaUpdate.type";
import usePersonas from "../../../hooks/personas/usePersonas";
import FormSelect from "../formSelect/FormSelect";
import { Sexo } from "../../../types/Sexo.type";
import useToastit from "../../../hooks/useToastit";
import { getDate, getHour } from "../../../utils/formatDate";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";
import validarInputForm from "../../../utils/validarDatos";
import { IPacienteResponse } from "../../../types/Paciente/PacienteResponse.type";

interface IInformacionPersonaModal {
  modalField: IPacienteResponse;
  show: boolean;
  handleClose: () => void;
  handleConfirm: (personaResponse: IPersonaResponse) => void;
}

function InformacionPersonaModal({
  modalField,
  show,
  handleClose,
  handleConfirm,
}: IInformacionPersonaModal) {

  const [nombre, setNombre] = useState<string>(modalField.nombre);
  const [apellido, setApellido] = useState<string>(modalField.apellido);
  const [fechaNacimiento, setFechaNacimiento] = useState<string>(
    modalField.fechaNacimiento
  );
  const [telefono, setTelefono] = useState<string>(modalField.telefono);
  const [numeroDocumento, setNumeroDocumento] = useState<string>(
    modalField.numeroDocumento
  );
  const [sexo, setSexo] = useState<string>(modalField.sexo);
  const { pacienteInfo, setPacienteInfo } = usePacienteContext();
  const { personaInfo } = usePersonaInfoContext();
  const { putPersona } = usePersonas();
  const { error } = useToastit();
  //utiliza el enum Sexo
  const valores = Object.keys(Sexo).filter((key) => !isNaN(Number(key)));
  const claves = Object.keys(Sexo).filter((key) => isNaN(Number(key)));

  useEffect(() => {}, [pacienteInfo]);
  /*
  async function updatePersona() {
    var persona: IPersonaUpdate | undefined = recibirInfoUpdated(); //persona.sexoId = 2;
    if (persona == undefined || pacienteInfo == undefined) return;
    var updatedPersona: IPersonaResponse | undefined = await putPersona(
      persona,
      pacienteInfo.id.toString()
    );
    if (updatedPersona != undefined) {
      handleConfirm(updatedPersona)
    }
  }*/
  /*
  function recibirInfoUpdated(): IPersonaUpdate | undefined {
 var datosOk: boolean[] = inputValues.map((elem) => {
      if (validarInputForm(elem.value, elem.key, elem.typeInput) == false) {
        error(`Informacion Invalida- ${elem.label}`);
        return false;
      } else {
        return true;
      }
    });

    if (datosOk.some((value) => value == false)) {
      error("DATOS INVALIDOS");
      return;
    }
  
    handleClose();
  
    var getNombre = getValue("nombre");
    var getApellido = getValue("apellido");
    var getNumeroDocumento = getValue("numeroDocumento");
    var getTelefono = getValue("telefono");
    var getSexo = getValue("sexo");
    var getSexoId = claves.indexOf(getSexo) + 1; //arranca en 0 los id son 1,2,3
    var getFechaNacimiento = getValue("fechaNacimiento");
    var date = getDate(getFechaNacimiento);
    var hour = getHour(getFechaNacimiento);
    var fechaNacFormated = date + "T" + hour;

    const objetUpdate: IPersonaUpdate = {
      nombre: getNombre,
      apellido: getApellido,
      numeroDocumento: getNumeroDocumento,
      telefono: getTelefono,
      sexoId: getSexoId,
      fechaNacimiento: fechaNacFormated,
    };
    return objetUpdate;
  }  */

    function validarInfoPersonaUpdated(persona : IPersonaUpdate) : void{

      Object.entries(persona).map(([key,value])=>{
     
      
  
    })}

  async function updatePersona() {
    var getSexoId = claves.indexOf(sexo) + 1; //arranca en 0 los id son 1,2,3

    var date = getDate(fechaNacimiento);
    var hour = getHour(fechaNacimiento);
    var fechaNacFormated = date + "T" + hour;

    var persona: IPersonaUpdate = {
      nombre: nombre,
      apellido: apellido,
      numeroDocumento: numeroDocumento,
      telefono: telefono,
      sexoId: getSexoId,
      fechaNacimiento: fechaNacFormated,
    };
    console.log(persona);
    if(pacienteInfo == null)return;
    var updatedPersona: IPersonaResponse | undefined = await putPersona(
      persona,
      pacienteInfo.id.toString()
    );    
    if(updatedPersona == null) return;
    handleConfirm(updatedPersona)
    handleClose();


  }

  return (
    <>
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={updatePersona}
        title="Editar Información Personal"
      >
        <Form className="d-flex flex-column" style={{ gap: "10px" }}>
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />
          </Form.Group>
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setApellido(e.target.value)}
              value={apellido}
            />
          </Form.Group>
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>
              Fecha Nacimiento
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setFechaNacimiento(e.target.value)}
              value={fechaNacimiento}
            />
          </Form.Group>
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setTelefono(e.target.value)}
              value={telefono}
            />
          </Form.Group>
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>
              Número Documento
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setNumeroDocumento(e.target.value)}
              value={numeroDocumento}
            />
          </Form.Group>


          <Form.Group>
            <Form.Label style={{ textAlign: "left" }}>Sexo</Form.Label>
            <Form.Select onChange={(e) => setSexo(e.target.value)} value={sexo}>
              {claves.map((elem) => {
                return <option value={elem}>{elem}</option>;
              })}
            </Form.Select>
          </Form.Group>
        </Form>
      </GenericModal>
    </>
  );
}

export default InformacionPersonaModal;
