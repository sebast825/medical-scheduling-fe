export default function splitKeyNombreEspecialidad(key: string): {
   nombre: string;
   especialidad: string;
 } {
   var nombreEspecialidad: string[] = key.split("-");

   var splitKey = {
     nombre: nombreEspecialidad[0],
     especialidad: nombreEspecialidad[1],
   };
   return splitKey;
 }