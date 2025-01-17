export const ESTADOS_TURNO = {
   PROGRAMADO: 'Programada',
   CANCELADO: 'Cancelada',
   COMPLETADO: 'Completada',
   LLAMANDO: 'LLamando',
   EN_PROGRESO: 'EnProgreso',
   FINALIZADO: 'Finalizada',
   NO_ASISTIDO: 'NoAsistida'
};

 const ESTADOS_TURNO_FRONT = {
   Programada: 'Programado',
   Cancelada: 'Cancelado',
   Completada: 'Completado',
   LLamando: 'Llamando',
   EnProgreso: 'En Progreso',
   Finalizada: 'Finalizado',
   NoAsistida: 'No Asiste'
};

export const ESTADOS_TURNO_FRONT_MATCH = Object.fromEntries(
   Object.entries(ESTADOS_TURNO_FRONT).map(([key, value]) => [key,value])
 );