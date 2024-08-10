import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

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
  
  listItems.forEach((element) => {
    console.log(element);
  });

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
    <>
      <input
        className="form-control"
        placeholder="Buscar"
        type="text"
        value={buscarItem}
        onChange={(e) => updateRegEx(e)}
      />
      <br></br>
      <ListGroup className="gap-2 d-flex justify-content-center align-items-center">
        {mostrarItems.map((item) => (
          <ListGroup.Item
            action
            className="text-center"
            style={{ maxWidth: "500px" }}
            onClick={() => handleSelect(item.id)}
          >
            {item.nombre}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default List;
