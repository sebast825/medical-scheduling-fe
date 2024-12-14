import { IPersonaResponse } from "../Persona/PersonaResponse.type";

interface IPacienteResponse extends IPersonaResponse{
     telefonoEmergencia: string;
     nombreEmergencia :string;
}

export default IPacienteResponse;