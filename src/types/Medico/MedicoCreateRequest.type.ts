import { PersonaCreateRequest } from "../Persona/PersonaCreateRequest.type";
import { IPersonaResponse } from "../Persona/PersonaResponse.type";

interface MedicoCreateRequest extends PersonaCreateRequest {  
     NumeroLicencia :string,
     EspecialidadId : number
}

export default MedicoCreateRequest;