import Opening from "../../General/Opening/Opening";
import List from "../List/List";

interface IListOpening{
   title: string;
   subtitle?: string;
   listItems: {
      nombre: string;
      id: number;
    }[];
    handleSelect: (e: number) => void;
}

function ListOpening ({title,subtitle,listItems,handleSelect}:IListOpening){
   return(
      <>
         <Opening title={title} subTitle={subtitle ? subtitle : undefined} />
         <List listItems={listItems} handleSelect={handleSelect}/>
      </>
   )
}

export default ListOpening;