import { ListGroup } from "react-bootstrap";

interface IList {
  listItems: {
    nombre: string;
    id: number;
  }[];
  handleSelect: (e: number) => void;
}

function List({ listItems, handleSelect }: IList ){
  return (
    <ListGroup className="gap-2 d-flex justify-content-center align-items-center">
      {
         listItems.map((item) =>( 
          <ListGroup.Item
          action
          className="text-center"
          style={{ maxWidth: "500px" }}
          onClick={()=>handleSelect(item.id)}
        >
       {   item.nombre}
        </ListGroup.Item>
         ))
      }
 
    </ListGroup>
  );
}

export default List;
