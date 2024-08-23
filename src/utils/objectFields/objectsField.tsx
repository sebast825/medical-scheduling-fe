import { IGenericObject } from "../../types/IGenericObject.type";


export const personaModalFields : IGenericObject[] = [
  { key: "nombre", label: "Nombre" ,typeInput: "text"},
  { key: "apellido", label: "Apellido", typeInput: "text"},
  { key: "fechaNacimiento", label: "Fecha Nacimiento", formatValue: (value: string) => new Date(value).toLocaleDateString(),typeInput: "date" },
  { key: "telefono", label: "Teléfono",typeInput: "tel" },
  { key: "numeroDocumento", label: "Numero Documento", typeInput: "number" },
  { key: "sexo", label: "Sexo" ,typeInput: "text"},
];

