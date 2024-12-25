import PacienteCreateRequest from "../Paciente/PacienteCreateRequest.type copy";
import { CreateUsuarioRequest } from "./CreateUsuarioRequest";

export interface CreateUsuarioAndPacienteRequestDto{
   Paciente : PacienteCreateRequest,
   Usuario : CreateUsuarioRequest
}