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


function dividirFechaHora(fechaHora: string): Date {
  // Dividir la fecha y hora
  const partes = fechaHora.split(" ");
  if (partes.length !== 3) {
    throw new Error("Fecha y hora no tienen el formato esperado");
  }

  // Extraer la fecha y la hora
  const fecha = partes[0]; // MM/DD/YYYY
  const hora = partes[1]; // HH:MM:SS
  const amPm = partes[2]; // AM o PM

  // Crear una fecha en formato válido
  const fechaHoraISO = new Date(`${fecha} ${hora} ${amPm}`);
  
  // Verificar si la fecha es válida
  if (isNaN(fechaHoraISO.getTime())) {
    throw new Error("Fecha inválida");
  }
  return fechaHoraISO;
}

export function formatDateFromResponseDto(fechaHora: string): IDateFormated {
  try {
    const date: Date = dividirFechaHora(fechaHora);

    // Obtener la fecha y hora en el formato deseado
    const getDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).split("/");
    const getTime = date.toLocaleTimeString("en-US", { hour12: false }).split(":");

    // Formatear la fecha y hora
    const formatedTime = `${getTime[0]}:${getTime[1]}`;
    const formatedDate = `${getDate[1]}-${getDate[0]}-${getDate[2]}`;
    const formatedDateTime = `${formatedDate} ${formatedTime}`;

    // Devolver el objeto con la fecha formateada
    const rsta: IDateFormated = {
      date: formatedDate,
      time: formatedTime,
      dateTime: formatedDateTime,
    };
    return rsta;
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
    return {
      date: "Invalid Date",
      time: "Invalid Time",
      dateTime: "Invalid DateTime",
    };
  }
}

export function parseDateFromResponseStringToDate(dateString: string): Date | null {
  // Regex para M/D/YYYY h:mm:ss AM/PM
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{2}) (AM|PM)$/;
  const match = dateString.match(regex);

  if (!match) {
    console.error(`Formato inválido: ${dateString}`);
    return null;
  }

  // Extraer partes
  const [, month, day, year, hours, minutes, seconds, meridian] = match;

  // Convertir a formato de 24 horas si es necesario
  let parsedHours = parseInt(hours, 10);
  if (meridian === "PM" && parsedHours < 12) {
    parsedHours += 12;
  }
  if (meridian === "AM" && parsedHours === 12) {
    parsedHours = 0;
  }

  // Crear el objeto Date
  const date = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1, // Meses son 0-indexed
    parseInt(day, 10),
    parsedHours,
    parseInt(minutes, 10),
    parseInt(seconds, 10)
  );

  // Validar fecha
  if (
    date.getDate() !== parseInt(day, 10) ||
    date.getMonth() !== parseInt(month, 10) - 1 ||
    date.getFullYear() !== parseInt(year, 10)
  ) {
    console.error("Fecha inválida después de crear Date:", dateString);
    return null;
  }

  return date;
}

