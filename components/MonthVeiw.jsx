import { DayBtn } from "./DayBtn";
import { Progress } from "@/components/ui/progress";

function MonthVeiw() {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const today = new Date().getDate();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const firstDayInMonth = new Date(`${month}/01/${year}`).getDay();
  const monthName = new Date().toLocaleString("default", { month: "long" });
  const monthDays = daysInMonth(year, month);
  let monthPoints = 0;
  const daysArray = Array.from({ length: monthDays }, (value, i) => i + 1);
  const monthData = {
    1: "done",
    2: "done",
    4: "done",
    5: "done",
    6: "done",
    7: "done",
    9: "done",
    10: "done",
    11: "done",
    14: "done",
  };

  Object.keys(monthData).map((key) => {
    if (monthData[key]) monthPoints++;
  });
  return (
    <div className="container max-w-xl">
      <h2 className="font-bold text-3xl">
        {monthName} / {year}
      </h2>
      <div className="mb-12">
        <div className="text-end text-gray-500 mb-2">
          Month Points <span className="font-bold">{monthPoints}</span>/
          {monthDays}
        </div>
        <Progress value={(monthPoints / monthDays) * 100} className="h-2" />
      </div>
      <div className="grid grid-cols-7 gap-y-5 justify-items-center">
        {dayNames.map((day, i) => (
          <p
            className={`text-center ${
              i === new Date().getDay() ? "text-primary font-bold" : ""
            }`}
            key={day}
          >
            {day}
          </p>
        ))}

        {dayNames.map(
          (day, i) =>
            i < firstDayInMonth && <DayBtn status="null" key={i}></DayBtn>
        )}
        {daysArray.map((day, i) => {
          return (
            <>
              {day < today && (
                <DayBtn status={monthData[day] ? "done" : "fail"} key={i}>
                  {day}
                </DayBtn>
              )}

              {day === today && (
                <DayBtn status={monthData[day] ? "done" : "current"} key={i}>
                  {day}
                </DayBtn>
              )}

              {day > today && (
                <DayBtn status="comming" key={i}>
                  {day}
                </DayBtn>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default MonthVeiw;
