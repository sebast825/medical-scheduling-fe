import { PersonaResponse } from "../Persona/PersonaResponse.type";

export interface PacienteResponse extends PersonaResponse{
     TelefonoEmergencia: string;
     NombreEmergencia :string;
}