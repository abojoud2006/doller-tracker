"use client";
import MonthView from "@/components/MonthView";
import { useData } from "../../context/Context";

function Page({ params }) {
  const { yearData } = useData();
  const currentMonth = +params.id;
  const currentMonthData = yearData[currentMonth] || [];
  return (
    <div className="pt-20 container">
      <MonthView month={currentMonth} monthData={currentMonthData} />
    </div>
  );
}

export default Page;
