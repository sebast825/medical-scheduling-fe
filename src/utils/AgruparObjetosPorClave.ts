import { DisponibilidadMedico } from "../types/DisponibilidadMedico/DisponibilidadMedico";

  /*al recibir un listado de objetos con valores repetidos, por ejemplo el horarios de los medicos
    agrupamos todos los horarios bajo un mismo medico
    Record devuelve conjuntos clave valor
  */

    // Define el tipo del estado

   const agruparObjetosPorClave2 = (arrayObjetos : Array<DisponibilidadMedico>, key : string)
   
   :Record<string, DisponibilidadMedico[]>  =>  {
      return arrayObjetos.reduce((result : any, item : any) => {
        const groupKey = item[key];
        if (!result[groupKey]) {
          result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
      }, {} as Record<string,DisponibilidadMedico[]>);
    };


    const agruparObjetosPorClave = (arrayObjetos : Array<DisponibilidadMedico>, key : string,especialidad:string)
   
    :Record<string, DisponibilidadMedico[]>  =>  {
      return arrayObjetos.reduce((result : any, item : any) => {
         const groupKey = `${item[key]}-${item[especialidad]}`;
         if (!result[groupKey]) {
           result[groupKey] = [];
         }
         result[groupKey].push(item);
         return result;
       }, {} as Record<string,DisponibilidadMedico[]>);
        
     };

     export { agruparObjetosPorClave};
 
    