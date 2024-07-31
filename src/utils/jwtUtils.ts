import { jwtDecode, JwtPayload } from 'jwt-decode';



export default function GetJwtContent(token : string){
   const decodeJwt: (token: string) => JwtPayload = jwtDecode as any;
   const decodedToken: JwtPayload = jwtDecode(token) as JwtPayload;
   console.log(decodedToken);
   return decodedToken;
}