import { IObjectField } from "../hooks/objectField/useGenericObjetField";

export interface IGenericObject{
   key:string;
   label: string;
   value?:string;
   formatValue ?: (value : any) => string;
}
export const personaModalFields : IGenericObject[] = [
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "fechaNacimiento", label: "Fecha Nacimiento", formatValue: (value: string) => new Date(value).toLocaleDateString() },
  { key: "telefono", label: "Teléfono" },
  { key: "numeroDocumento", label: "Numero Documento" },
  { key: "sexo", label: "Sexo" },
];