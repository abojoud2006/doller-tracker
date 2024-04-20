"use client";
import MonthView from "@/components/MonthView";
import { useData } from "../context/Context";

function Page() {
  const { yearData } = useData();
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthData = yearData[currentMonth] || [];
  return <MonthView month={currentMonth} monthData={currentMonthData} />;
}

export default Page;
