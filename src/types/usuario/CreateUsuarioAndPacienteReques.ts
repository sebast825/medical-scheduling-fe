import PacienteCreateRequest from "../Paciente/PacienteCreateRequest.type copy";
import IPacienteResponse from "../Paciente/PacienteResponse.type";
import { CreateUsuarioRequest } from "./CreateUsuarioRequest";

export interface CreateUsuarioAndPacienteRequestDto{
   Paciente : PacienteCreateRequest,
   Usuario : CreateUsuarioRequest
}