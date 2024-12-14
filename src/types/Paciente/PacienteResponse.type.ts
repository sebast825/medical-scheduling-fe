import { IPersonaResponse } from "../Persona/PersonaResponse.type";

export interface IPacienteResponse extends IPersonaResponse{
     TelefonoEmergencia: string;
     NombreEmergencia :string;
}

