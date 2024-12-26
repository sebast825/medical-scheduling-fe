import { IPersonaUpdate } from "../types/Persona/PersonaUpdate.type";

export  function validarPersona(dto: IPersonaUpdate) {
    if (!dto.nombre || dto.nombre.length < 2 || dto.nombre.length > 100)
      return "El nombre debe tener entre 2 caracteres y 100 caracteres.";
    if (!dto.apellido || dto.apellido.length < 2 || dto.nombre.length > 100)
      return "El apellido debe tener entre 2 caracteres y 100 caracteres.";
    if (!/^\d{8,15}$/.test(dto.telefono))
      return "El teléfono debe contener entre 8 y 15 dígitos.";
    if (!dto.sexoId || dto.sexoId < 1 || dto.sexoId > 3)
      return "El sexo no es válido.";
    if (!dto.numeroDocumento || dto.numeroDocumento.length != 8)
      return "El numero de documento es invalido";

    const fechaNac = new Date(dto.fechaNacimiento);
    const fechaActual = new Date();
    if (fechaNac >= fechaActual) {
      return "La fecha de nacimiento debe ser anterior a la fecha actual.";
    }
  }