
  /*al recibir un listado de objetos con valores repetidos, por ejemplo el horarios de los medicos
    agrupamos todos los horarios bajo un mismo medico
  */
   const agruparObjetosPorClave = (arrayObjetos : Array<any>, key : string) => {
      return arrayObjetos.reduce((result : any, item : any) => {
        const groupKey = item[key];
        if (!result[groupKey]) {
          result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
      }, {});
    };
    export default agruparObjetosPorClave;