

export default function formatDate (fecha: string):string{
   const date = new Date(fecha);

    // Obtener componentes de la fecha
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

   // Formatear la fecha como "YYYY-MM-DD HH:mm"
   const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  
    return formattedDate;
}