import { PersonaCreateRequest } from "../Persona/PersonaCreateRequest.type";
import { IPersonaResponse } from "../Persona/PersonaResponse.type";

interface PacienteCreateRequest{
     telefonoEmergencia: string;
     nombreEmergencia :string;
}

export default PacienteCreateRequest;