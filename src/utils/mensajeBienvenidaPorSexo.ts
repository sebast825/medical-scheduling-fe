import { Sexo } from "../types/Sexo.type";

export function mensajeBienvenidaPorSexo(str : string) {
  console.log(str)
   if (str != Sexo[1]) {
     return "Bienvenido";
   } else {
     return "Bienvenida";
   }
 }