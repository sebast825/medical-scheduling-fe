

export function formatDate(fecha: string): string {
    const date = new Date(fecha);

    // Obtener componentes de la fecha en UTC
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    // Formatear la fecha como "YYYY-MM-DD HH:mm"
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  
    return formattedDate;
}

function splitDateAndHour(fecha :string){

    var splitDate = formatDate(fecha).split(" ");
    return splitDate;

}

export function getDate(fecha:string) :string {
    var date = splitDateAndHour(fecha)[0];
    return date;
}

export function getHour(fecha:string) : string{
    var hour = splitDateAndHour(fecha)[1];
    return hour;
}


//date es un date en string
export function crearFecha(horaDia: string, date : string) :string{
    const [year, month, day] = date.split('-').map(Number);

    const [horas, minutos, segundos] = horaDia.split(':').map(Number);
    
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