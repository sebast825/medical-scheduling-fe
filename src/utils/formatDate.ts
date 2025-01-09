export function formatDate(fecha: string): string {
  const date = new Date(fecha);

  // Obtener componentes de la fecha en UTC
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  // Formatear la fecha como "YYYY-MM-DD HH:mm"
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
}

function splitDateAndHour(fecha: string) {
  var splitDate = formatDate(fecha).split(" ");
  return splitDate;
}

export function getDate(fecha: string): string {
  var date = splitDateAndHour(fecha)[0];
  return date;
}

export function getHour(fecha: string): string {
  var hour = splitDateAndHour(fecha)[1];
  return hour;
}

//date es un date en string
export function crearFecha(horaDia: string, date: string): string {
  const [year, month, day] = date.split("-").map(Number);

  const [horas, minutos, segundos] = horaDia.split(":").map(Number);

  const fecha = new Date(year, month - 1, day, horas, minutos, 0);
  return ajustarFechaPorZonaHoraria(fecha.toString());
}

//al convertir la hora a isso depende donde este le saca horas, esto permite que se coordine
function ajustarFechaPorZonaHoraria(horario: string): string {
  // Crear un objeto Date a partir de la fecha y hora proporcionadas
  let fecha = new Date(horario);

  // Obtener el desfase en minutos (positivo si está detrás de UTC, negativo si está adelante)
  let desfaseMinutos = fecha.getTimezoneOffset();

  // Convertir los minutos a milisegundos y restarlos de la fecha original
  fecha.setMinutes(fecha.getMinutes() - desfaseMinutos);

  // Convertir la fecha ajustada a un string en formato ISO
  return fecha.toISOString();
}

export interface IDateFormated {
  date: string;
  time: string;
  dateTime: string;
}


function dividirFechaHora(fechaHora : string) : Date{
  // Dividir la fecha y hora
  const dividirFechaHora = fechaHora.split(" ");
  if (dividirFechaHora.length !== 2) {
    throw new Error('Fecha y hora no tienen el formato esperado');
  }

  // Dividir la fecha en día, mes y año (usando el formato DD/MM/YYYY)
  let fecha = dividirFechaHora[0].split("/");
  if (fecha.length !== 3) {
    throw new Error('Fecha no tiene el formato esperado');
  }

  // Asegurarse de que la fecha sea válida y que se pueda formatear correctamente
  // El formato para JavaScript debe ser YYYY-MM-DD
  let fechaFormated = `${fecha[2]}-${fecha[1]}-${fecha[0]}`;

  // Asegurarse de que la hora tenga dos dígitos
  let hora = dividirFechaHora[1].split(":");
  if (hora[0].length === 1) {
    hora[0] = "0" + hora[0]; // Agregar un 0 si la hora tiene un solo dígito
  }
  let horaFormateada = hora.join(":");
  // Crear un objeto Date usando el formato ISO 8601 para garantizar la correcta interpretación
  const date = new Date(fechaFormated + "T" + horaFormateada);

  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    throw new Error('Fecha inválida');
  }
  return date;
}

export function formatDateFromResponseDto(fechaHora: string): IDateFormated {
  try {
  
    let date : Date = dividirFechaHora(fechaHora);
    // Obtener la fecha y hora en el formato deseado
    const getDate = date.toLocaleDateString([], { hour12: false }).split("/");
    const getTime = date.toLocaleTimeString([], { hour12: false }).split(":");

    // Formatear la fecha y hora
    const formatedTime = getTime[0] + ":" + getTime[1];
    const formatedDate = getDate[0] + "-" + getDate[1] + "-" + getDate[2];
    const formatedDateTime = `${getDate[0]}-${getDate[1]}-${getDate[2]} ${getTime[0]}:${getTime[1]}`;

    // Devolver el objeto con la fecha formateada
    let rsta: IDateFormated = {
      date: formatedDate,
      time: formatedTime,
      dateTime: formatedDateTime,
    };
    return rsta;
  } catch (error) {
    console.error('Error al formatear la fecha:', error);
    return {
      date: 'Invalid Date',
      time: 'Invalid Time',
      dateTime: 'Invalid DateTime'
    };
  }
}



export function parseDateFromResponseStringToDate(dateString: string): Date | null {
  const parts = dateString.split(/[\/\s:]/); // Separa por /, espacio y :

  if (parts.length !== 6) {
    return null; // Formato inválido
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Meses en JavaScript son 0-indexed
  const year = parseInt(parts[2], 10);
  const hours = parseInt(parts[3], 10);
  const minutes = parseInt(parts[4], 10);
  const seconds = parseInt(parts[5], 10);

  //Verificación de validez de la fecha (opcional pero recomendado)
  const date = new Date(year, month, day, hours, minutes, seconds);
  if (
    date.getDate() !== day ||
    date.getMonth() !== month ||
    date.getFullYear() !== year
  ) {
    return null; // Fecha inválida
  }

  return date;
}
