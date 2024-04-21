"use client";
import MonthView from "@/components/MonthView";
import { useData } from "../../context/Context";

function Page({ params }) {
  const { yearPoints } = useData();
  const currentMonth = +params.id;
  const currentMonthPoints = yearPoints[currentMonth] || [];
  return <MonthView month={currentMonth} monthPoints={currentMonthPoints} />;
}

export default Page;
