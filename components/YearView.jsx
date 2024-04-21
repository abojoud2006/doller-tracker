"use client";

import { useData } from "@/app/(root)/context/Context";
import MonthView from "./MonthView";
import { LoaderCircle } from "lucide-react";
function YearView() {
  const { yearDays, yearPoints, isLoading } = useData();

  return (
    <div className="flex flex-wrap gap-x-24 gap-y-24 container min-h-[calc(100vh-25rem)] justify-center">
      {isLoading && (
        <div className="absolute bg-white/80 container inset-0 z-50 flex items-center justify-center">
          <LoaderCircle
            className="animate-spin size-32 text-indigo-300"
            strokeWidth={1.5}
          />
        </div>
      )}
      {yearDays.map((month, i) => {
        let data = yearPoints[Object.entries(month)[0][0]];
        data = data?.map((i) => Number(i));
        const monthPoints = data ? data : [];
        return (
          <MonthView
            key={i}
            month={Number(Object.entries(month)[0][0])}
            monthPoints={monthPoints}
          />
        );
      })}
    </div>
  );
}

export default YearView;
