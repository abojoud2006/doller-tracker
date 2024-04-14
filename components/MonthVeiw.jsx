import { DayBtn } from "./DayBtn";

function MonthVeiw() {
  const status = ["done", "fail", "current", "comming"];
  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const today = new Date().getDate();
  const days = daysInMonth(year, month);
  const daysArray = Array.from({ length: days }, (value, i) => i + 1);

  return (
    <div className="container flex gap-3 flex-wrap max-w-lg">
      {daysArray.map((day) => (
        <DayBtn status={day > today ? "comming" : status[0]} key={day}>
          {day}
        </DayBtn>
      ))}
    </div>
  );
}

export default MonthVeiw;
