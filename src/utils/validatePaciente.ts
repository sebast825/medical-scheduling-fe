import { IPacienteUpdate } from "../types/Paciente/PacienteUpdate.type";

export  function validarPaciente(dto: IPacienteUpdate) {
    if (!dto.NombreEmergencia || dto.NombreEmergencia.length < 2 || dto.NombreEmergencia.length > 100)
      return "El nombreEmergencia debe tener entre 2 caracteres y 100 caracteres.";
    if (!/^\d{8,15}$/.test(dto.TelefonoEmergencia))
      return "El teléfono debe contener entre 8 y 15 dígitos.";
   
  }