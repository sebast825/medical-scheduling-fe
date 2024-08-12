import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface IListHorarios {
  listHorarios: string[];
  handleSelect: (horario: string) => void;
}

function ListHorarios({ listHorarios, handleSelect }: IListHorarios) {
  const [horarios, setHorarios] = useState<string[]>();

  useEffect(() => {
    var listHorariosFormated = listHorarios.map((elem) => {
      const timeString = elem;
      const formattedTime = timeString.substring(0, 5);
      return formattedTime;
    });
    setHorarios(listHorariosFormated);
  }, []);
  return (
    <>
      {horarios?.map((elem) => {
        return (
          <Button key={elem} variant="primary" onClick={() => handleSelect(elem)}>
            {elem}
          </Button>
        );
      })}
    </>
  );
}

export default ListHorarios;
