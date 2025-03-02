export interface LicenseResponseDto{
   Id : number,
   MedicoId : number,
   Medico : string,
   StartDate : Date,
   EndTime : Date | null,
   Reason : string 
}

