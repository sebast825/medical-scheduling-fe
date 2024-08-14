import { IMedicoResponse } from "../../../types/MedicoResponse.type";
import List from "../../Lists/List/List";
import ListOpening from "../../Lists/ListOpening/ListOpening";


interface IListMedicos{
   listMedicos: IMedicoResponse[];
   handleSelect: (e: number) => void;
}

function ListMedicos ({listMedicos, handleSelect}:IListMedicos){

  //objete medicos filtrado, solo con los datos necesarios
   const filterMedicos =
   listMedicos?.map((medico) => {
     return { nombre: medico.nombre + " " + medico.apellido, id: medico.id };
   }) || [];



   return(

      <List listItems={filterMedicos} handleSelect={handleSelect} />
   )
}

export default ListMedicos;