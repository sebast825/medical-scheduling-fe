import React, {FC} from "react";
import { IMedicoResponse } from "../../../types/MedicoResponse.type";

interface MedicosListProps {
   listaMedicos: IMedicoResponse[];
 }
const MedicosList : FC <MedicosListProps> = ({listaMedicos}) =>{
   console.log(listaMedicos);

   return(
      <>desdeMedicos</>
   )
}

export default MedicosList;