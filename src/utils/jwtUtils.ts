import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
   sub: string;
   jti: string;
   iat: string;
   UserId: string;
   PersonaId: string;
   role: string; // Alias para la propiedad role, acceso mas comodo
   UserName: string;
   exp: number;
   iss: string;
   aud: string;
   // Mantenemos la propiedad original para compatibilidad
   "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
 }
 

export default function GetJwtContent(token : string) : DecodedToken{
  

   const decodedToken : DecodedToken = jwtDecode(token) as DecodedToken;
   decodedToken.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
   return decodedToken;
}

