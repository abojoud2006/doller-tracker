"use client";

import { useData } from "@/app/context/Context";
import YearMonth from "./MonthView";
function YearView() {
  const { yearDays, yearData } = useData();

  return (
    <div className="grid grid-cols-3 gap-28 gap-y-6 container ">
      {yearDays.map((month, i) => {
        let data = yearData[Object.entries(month)[0][0]];
        data = data?.map((i) => Number(i));
        const monthData = data ? data : [];
        return (
          <YearMonth
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
