import MedicosList from "../../Components/General/MedicosList/MedicosList";
import { useEffect,useState } from "react";
import { fetchMedicos } from "../../services/apiService";
import { IMedicoResponse } from "../../types/MedicoResponse.type";
import { Table } from 'react-bootstrap';
import DataTable from "../../Components/General/MedicosList/MedicosList";

function NuestrosMedicos(){
   const [listaMedicos, setListaMedicos] = useState<IMedicoResponse[]>([]); 
   const [error, setError] = useState(null);

   useEffect(()=>{
      const fetchData = async () => {
         try {
           const response : IMedicoResponse[] = await fetchMedicos();
           setListaMedicos(response);
         } catch (err : any)
         {
           setError(err.message || 'Error desconocido');
         } finally {
         }
       };
       
       fetchData();

},[])
//filtra los medicos para tener la info encesaria
var listaMedicosFiltered = listaMedicos.map(elem =>{
   var obj = {nombre: elem.nombre + " " +elem.apellido,
      especialidad: elem.especialidad
   }
   return obj;
})
//listaMedicosFiltered.forEach(elm => console.log(elm))

 return (
   <Table striped bordered hover>
   <thead>
     <tr>
       <th>Nombre</th>
       <th>Especialidad</th>
     </tr>
   </thead>
   <tbody>
     {listaMedicos.map((item, index) => (
       <tr key={index}>
         <td>{item.apellido + " "+ item.nombre}</td>
         <td>{item.especialidad}</td>
       </tr>
     ))}
   </tbody>
 </Table>
 );
};

export default NuestrosMedicos;