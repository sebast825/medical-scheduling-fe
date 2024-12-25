import { PersonaCreateRequest } from "../Persona/PersonaCreateRequest.type";
import { IPersonaResponse } from "../Persona/PersonaResponse.type";

interface PacienteCreateRequest extends PersonaCreateRequest{
     telefonoEmergencia: string;
     nombreEmergencia :string;
}

export default PacienteCreateRequest;