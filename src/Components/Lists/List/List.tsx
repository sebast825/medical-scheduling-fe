import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import BackLink from "../../buttons/BackLink/BackLink";
import "./List.scss"
interface IList {
  listItems: {
    nombre: string;
    id: number;
  }[];
  handleSelect: (e: number) => void;
}

function List({ listItems, handleSelect }: IList) {
  const [buscarItem, setbuscarItem] = useState<string>("");
  const [mostrarItems, setMostrarItems] = useState<any[]>(listItems);
  


  function updateRegEx(e: any) {
    setbuscarItem(e.target.value);
  }

  useEffect(() => {
    setMostrarItems(listItems);
  }, [listItems]);

  useEffect(() => {
    const regEx = new RegExp(`^${buscarItem}`, "i");
    const filteredItems = listItems.filter((item) => regEx.test(item.nombre));
    setMostrarItems(filteredItems);
  }, [buscarItem]);

  return (
    < div className="m-2  d-flex flex-column justify-content-center align-items-center">
      <input
        className="form-control  input-con-lupa"
        placeholder="Buscar"
        type="text"
        value={buscarItem}
        onChange={(e) => updateRegEx(e)}
        style={{ width: "350px", minWidth: "300px"}}
        />
      <br></br>
      <ListGroup className="gap-2 d-flex justify-content-center align-items-center">
        {mostrarItems.map((item) => (
          <ListGroup.Item 
          key= {item.id}
            action
            className="text-center"
            style={{ maxWidth: "500px",width: "350px",minWidth:"300px" }}
            onClick={() => handleSelect(item.id)}
          >
            {item.nombre}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <BackLink/>
    </div>
  );
}

export default List;
