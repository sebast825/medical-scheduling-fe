import { DisponibilidadMedico } from "../types/DisponibilidadMedico/DisponibilidadMedico";
import { diasSemana } from "./diasSemana";

/*al recibir un listado de objetos con valores repetidos, por ejemplo el horarios de los medicos
    agrupamos todos los horarios bajo un mismo medico
    Record devuelve conjuntos clave valor
  */

// Define el tipo del estado

const agruparObjetosPorClave2 = (
  arrayObjetos: Array<DisponibilidadMedico>,
  key: string
): Record<string, DisponibilidadMedico[]> => {
  return arrayObjetos.reduce((result: any, item: any) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, DisponibilidadMedico[]>);
};

const agruparObjetosPorClave = (
  arrayObjetos: Array<DisponibilidadMedico>,
  key: string,
  especialidad: string
): Record<string, DisponibilidadMedico[]> => {
  let sortByHorario = ordernarDisponibilidadMedicoPorHorario(arrayObjetos);
  let sortByDay = ordernarDisponibilidadMedicoPorDia(sortByHorario);
  return sortByDay.reduce((result: any, item: any) => {
    const groupKey = `${item[key]}-${item[especialidad]}`;
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, DisponibilidadMedico[]>);
};

export { agruparObjetosPorClave };

const ordernarDisponibilidadMedicoPorDia = (
  arrayObjetos: Array<DisponibilidadMedico>
): Array<DisponibilidadMedico> => {
  return arrayObjetos.sort((a, b) => {
    var primero = diasSemana.find((elem) => elem.nombre == a.diaSemana);
    var segundo = diasSemana.find((elem) => elem.nombre == b.diaSemana);
    if (primero && segundo) {
      return primero?.id - segundo?.id;
    } else {
      return 1;
    }
  });
};

const ordernarDisponibilidadMedicoPorHorario = (
  arrayObjetos: Array<DisponibilidadMedico>
): Array<DisponibilidadMedico> => {
  return arrayObjetos.sort((a, b) => {
    var primero = splitTime(a.startTime);
    var segundo = splitTime(b.startTime);
    if (primero && segundo) {
      return primero.hour - segundo.hour;
    } else {
      return 1;
    }
  });
};

//time format =  hh:mmm
function splitTime(time: string): { hour: number; mins: number } {
  var hourMinutes = time.split(":");
  var hour = parseInt(hourMinutes[0], 10);
  var mins = parseInt(hourMinutes[1], 10);

  return { hour: hour, mins: mins };
}
