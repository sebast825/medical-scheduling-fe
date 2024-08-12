import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { crearFecha } from "../../../utils/formatDate";

interface IListHorarios {
  listHorarios: string[];
  handleSelect: (horario: string) => void;
  date:string;
}

function ListHorarios({ listHorarios, handleSelect,date }: IListHorarios) {
  const [horarios, setHorarios] = useState<string[]>();

  useEffect(() => {
    setHorarios(listHorarios);
    
  }, []);
 
  return (
    <>
      {horarios?.map((elem) => {
           const timeString = elem;
           const formattedTime = timeString.substring(0, 5);

        return (
          <Button key={elem} variant="primary" onClick={() => handleSelect(crearFecha(elem,date))}>
            {formattedTime}
          </Button>
        );
      })}
    </>
  );
}

export default ListHorarios;
