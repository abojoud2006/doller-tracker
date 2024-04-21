"use client";
import MonthView from "@/components/MonthView";
import { useData } from "../context/Context";

function Page() {
  const { yearPoints } = useData();
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthPoints = yearPoints[currentMonth] || [];
  return <MonthView month={currentMonth} monthPoints={currentMonthPoints} />;
}

export default Page;
