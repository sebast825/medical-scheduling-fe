import MedicoCreateRequest from "../Medico/MedicoCreateRequest.type";
import { CreateUsuarioRequest } from "./CreateUsuarioRequest";

export interface CreateUsuarioAndMedicoRequestDto{
   Medico : MedicoCreateRequest,
   Usuario : CreateUsuarioRequest
}