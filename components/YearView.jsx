"use client";

import { useData } from "@/app/(root)/context/Context";
import MonthView from "./MonthView";
function YearView() {
  const { yearDays, yearData } = useData();

  return (
    <div className="flex flex-wrap gap-x-24 gap-y-24 container">
      {yearDays.map((month, i) => {
        let data = yearData[Object.entries(month)[0][0]];
        data = data?.map((i) => Number(i));
        const monthData = data ? data : [];
        return (
          <MonthView
            key={i}
            month={Number(Object.entries(month)[0][0])}
            monthData={monthData}
          />
        );
      })}
    </div>
  );
}

export default YearView;
