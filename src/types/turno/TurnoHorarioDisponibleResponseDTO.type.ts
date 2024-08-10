export interface TurnoHorarioDisponibleResponseDTO {
   medicoId: number;
   fecha: Date;
   horario: string[]; // Usando string para representar TimeSpan
 }
 