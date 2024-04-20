"use client";
import MonthView from "@/components/MonthView";
import { useData } from "./context/Context";
export default function Home() {
  const { yearData } = useData();
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthData = yearData[currentMonth] || [];
  return (
    <div className="container flex justify-center">
      <MonthView month={currentMonth} monthData={currentMonthData} />
    </div>
  );
}
