"use client";
import MonthView from "@/components/MonthView";
import { useData } from "./context/Context";
export default function Home() {
  const { yearPoints } = useData();
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthPoints = yearPoints[currentMonth] || [];
  return (
    <div className="container flex justify-center">
      <MonthView month={currentMonth} monthPoints={currentMonthPoints} />
    </div>
  );
}
