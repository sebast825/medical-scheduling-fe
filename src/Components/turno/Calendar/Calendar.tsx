import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.scss";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ICalendario {
  dateList?: Date[];
  handleSelect: (e: string) => void;
}

function Calendario({ dateList, handleSelect }: ICalendario) {
  const [value, setValue] = useState<Value>(new Date());

const specialDates =
  dateList?.map((d) => {
    const [year, month, day] = d
    .toString()
      .slice(0, 10)
      .split("-")
      .map(Number);

    return new Date(year, month - 1, day);
  }) ?? [];

  const tileClassName = ({ date }: { date: Date }) => {
    const isSpecial = specialDates.some(
      (specialDate) =>
        date.getDate() === specialDate.getDate() &&
        date.getMonth() === specialDate.getMonth() &&
        date.getFullYear() === specialDate.getFullYear()
    );

    return isSpecial ? "highlighted-date" : "";
  };

  function clicked(date: Value, event: React.MouseEvent) {
    const target = event.target as HTMLElement;

    if (
      target.classList.contains("highlighted-date") ||
      target.closest("button")?.classList.contains("highlighted-date")
    ) {
      if (date instanceof Date) {
        handleSelect(date.toString());
      }
    }
  }

  return (
    <Calendar
      value={value}
      onChange={setValue}
      tileClassName={tileClassName}
      onClickDay={clicked}
    />
  );
}

export default Calendario;