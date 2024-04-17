"use client";
import { useData } from "../app/context/Context";
import { DayBtn } from "./DayBtn";
import { Progress } from "@/components/ui/progress";

function YearMonth({ month, monthData = [] }) {
  // const { monthData } = useData();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const firstDayInMonth = new Date(`${month}/01/${year}`).getDay();
  const monthName = new Date(`${month}/01/2024`).toLocaleString("default", {
    month: "long",
  });
  const monthDays = daysInMonth(year, month);
  let monthPoints = monthData.length;
  const daysArray = Array.from({ length: monthDays }, (value, i) => i + 1);

  return (
    <div className="xscale-75">
      <h2 className="font-bold text-3xl">
        {monthName} / {year}
      </h2>
      <div className="mb-12">
        <div className="text-end text-gray-500 mb-2">
          Month Points{" "}
          <span className="font-bold text-primary">{monthPoints}</span>/
          {monthDays}
        </div>
        <Progress value={(monthPoints / monthDays) * 100} className="h-2" />
      </div>
      <div className="grid grid-cols-7 gap-8 justify-items-center">
        {dayNames.map((day, i) => (
          <p
            className={`text-center ${
              i === new Date().getDay() ? "text-primary font-bold" : ""
            }`}
            key={i}
          >
            {day}
          </p>
        ))}

        {dayNames.map(
          (day, i) =>
            i < firstDayInMonth && <DayBtn status="null" key={i}></DayBtn>
        )}
        {daysArray.map((day, i) => {
          const dayChecked = monthData.includes(day);
          if (day < today && month <= currentMonth)
            return (
              <DayBtn
                status={dayChecked ? "done" : "fail"}
                dayNumber={day}
                monthNumber={month}
                key={i}
              >
                {day}
              </DayBtn>
            );

          if (day === today && month === currentMonth)
            return (
              <DayBtn
                status={dayChecked ? "done" : "current"}
                dayNumber={day}
                monthNumber={month}
                key={i}
              >
                {day}
              </DayBtn>
            );

          return (
            <DayBtn status="comming" dayNumber={day} key={i}>
              {day}
            </DayBtn>
          );
        })}
      </div>
    </div>
  );
}

export default YearMonth;
