"use client";
import MonthView from "@/components/MonthView";
import { useData } from "../../context/Context";

function Page({ params }) {
  const { yearData } = useData();
  const currentMonth = +params.id;
  const currentMonthData = yearData[currentMonth] || [];
  return <MonthView month={currentMonth} monthData={currentMonthData} />;
}

export default Page;
