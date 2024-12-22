import { IPersonaResponse } from "../Persona/PersonaResponse.type";

export interface IMedicoResponse extends IPersonaResponse {
   numeroLicencia: string;
   especialidad: string;

 }