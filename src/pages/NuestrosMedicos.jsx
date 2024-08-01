import MedicosList from "../Components/MedicosList/MedicosList";
import { useEffect,useState } from "react";
import { fetchMedicos } from "../services/apiService";

// interface MedicoResponse {
//    NumeroLicencia: string;
//    Especialidad: string;
//    Nombre: string;
//    Apellido: string;
//    FechaNacimiento: Date;
//    Telefono: string;
//    NumeroDocumento: string;
//    Sexo: string;
//    EstadoUsuario: string;
//  }
 

function NuestrosMedicos(){
   const [listaMedicos, setListaMedicos] = useState(null); 
   const [error, setError] = useState(null);

   useEffect(()=>{
      const fetchData = async () => {
         try {
           const response = await fetchMedicos();
           setListaMedicos(response);
         } catch (err) {
           setError(err.message || 'Error desconocido');
         } finally {
         }
       };
       
       fetchData();

},[])
console.log(listaMedicos)

   return(
      <MedicosList/>
   )
}

export default NuestrosMedicos;