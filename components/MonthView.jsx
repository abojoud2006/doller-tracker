"use client";
import Link from "next/link";
import { DayBtn } from "./DayBtn";
import { Progress } from "@/components/ui/progress";
import { Separator } from "./ui/separator";
import GoalProgress from "./GoalProgress";
import { usePathname } from "next/navigation";
import { useData } from "@/app/(root)/context/Context";
import { LoaderCircle } from "lucide-react";
function MonthView({ month, monthPoints = [] }) {
  const { isLoading } = useData();
  const path = usePathname();
  monthPoints = monthPoints.map((i) => +i);
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
  let points = monthPoints.length;
  const daysArray = Array.from({ length: monthDays }, (value, i) => i + 1);
  return (
    <div className="relative max-w-lg">
      {isLoading && path !== "/year" && (
        <div className="bg-white/80 inset-0 absolute z-50 flex items-center justify-center">
          <LoaderCircle
            className="animate-spin size-32 text-indigo-300"
            strokeWidth={1.5}
          />
        </div>
      )}
      <Link
        className="font-bold text-3xl hover:text-primary text-center md:text-start block mb-4"
        href={`/month/${month}`}
      >
        {monthName} / {year}
      </Link>
      <div className="mb-12 ">
        <div className="text-center md:text-end text-gray-500 mb-4">
          Month Points <span className="font-bold text-primary">{points}</span>/
          {monthDays}
        </div>
        <Progress value={(points / monthDays) * 100} className="h-2" />
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
          const dayChecked = monthPoints.includes(day);
          if (month < currentMonth)
            return (
              <DayBtn
                status={dayChecked ? "done" : "fail"}
                dayNumber={day}
                monthNumber={month}
                key={i}
              >
                {/* display day number */}
                {day}
              </DayBtn>
            );
          if (month === currentMonth && day <= today)
            return (
              <DayBtn
                status={
                  dayChecked ? "done" : day === today ? "current" : "fail"
                }
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
      {path !== "/year" && (
        <div>
          <Separator className="my-12 block" />
          <GoalProgress />
        </div>
      )}
    </div>
  );
}

export default MonthView;
