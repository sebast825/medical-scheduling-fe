import { PersonaCreateRequest } from "../Persona/PersonaCreateRequest.type";
import { CreateUsuarioRequest } from "./CreateUsuarioRequest";

export interface CreateUsuarioAndSecretarioRequestDto{
   Secretario : PersonaCreateRequest,
   Usuario : CreateUsuarioRequest
}