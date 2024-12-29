import { Sexo } from "../types/Sexo.type";

export function mensajeBienvenidaPorSexo(str : string) {
   if (str != Sexo[1]) {
     return "Bienvenido";
   } else {
     return "Bienvenida";
   }
 }