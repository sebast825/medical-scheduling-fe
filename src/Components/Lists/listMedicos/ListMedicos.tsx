import { IMedicoResponse } from "../../../types/MedicoResponse.type";
import ListOpening from "../ListOpening/ListOpening";


interface IListMedicos{
   listMedicos: IMedicoResponse[];
   handleSelect: (e: number) => void;
}

function ListMedicos ({listMedicos, handleSelect}:IListMedicos){

   const filterMedicos =
   listMedicos?.map((medico) => {
     return { nombre: medico.nombre + " " + medico.apellido, id: medico.id };
   }) || [];

   console.log("atr perro")

   return(

      <ListOpening title="Seleccionar Medico" listItems={filterMedicos} handleSelect={handleSelect} />
   )
}

export default ListMedicos;