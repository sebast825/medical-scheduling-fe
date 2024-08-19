import { IPersonaResponse } from "../Persona/PersonaResponse.type";

export interface PacienteResponse extends IPersonaResponse{
     TelefonoEmergencia: string;
     NombreEmergencia :string;
}