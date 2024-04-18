"use client";
import MonthView from "@/components/MonthView";
import { useData } from "../context/Context";

function Page_month() {
  const { yearData } = useData();
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthData = yearData[currentMonth] || [];
  return (
    <div className="pt-20 container">
      <MonthView month={currentMonth} monthData={currentMonthData} />
    </div>
  );
}

export default Page_month;
