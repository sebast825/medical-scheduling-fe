import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.scss";
import BackLink from "../../buttons/BackLink/BackLink";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ICalendario {
  dateList?: Date[];
  handleSelect: (e: string) => void;
}

function Calendario({ dateList, handleSelect }: ICalendario) {
  //puede tomar un solo valor o un rango de fechas
  const [value, setValue] = useState<Value>(new Date()); // Asegúrate de que el tipo Value se use correctamente
  // Función para determinar la clase de cada celda del calendario
  const tileClassName = ({ date }: { date: Date }) => {
    // Aquí defines las fechas específicas que deseas resaltar
    const specialDates: Date[] = [];
    dateList?.forEach((asd) => {
      var elem = new Date(asd);
      specialDates.push(elem);
      console.log(elem)

    });

    // Comprueba si la fecha actual está en la lista de fechas especiales
    return specialDates.some(
      (specialDate) =>
        date.getDate() === specialDate.getDate() &&
        date.getMonth() === specialDate.getMonth() &&
        date.getFullYear() === specialDate.getFullYear()
    )
      ? "highlighted-date"
      : "";
  };
  function clicked(date: Value, event: any) {
    const target = event.target;
    //en el boton esta la clase que colorea los dias disponibles, si posee la clase devuelve al elemento padre para que muestre los horarios disponibles para esa fecha
    if (
      target.classList.contains("highlighted-date") ||
      target.closest("button").classList.contains("highlighted-date")
    ) {
      if (date != null) {
        handleSelect(date.toString());
      }
    }
  }

  return (
 <>
 
      <Calendar
        value={value}
        onChange={setValue} // Usa la función manejadora
        tileClassName={tileClassName} // Asigna las clases a las celdas
        onClickDay={clicked}
      />

 </>
  );
}

export default Calendario;
