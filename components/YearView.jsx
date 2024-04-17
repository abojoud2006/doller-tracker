"use client";

import { useData } from "@/app/context/Context";
import YearMonth from "./YearMonth";
function YearView() {
  const { yearDays, yearData } = useData();

  // console.log(yearData);
  return (
    <div className="grid grid-cols-3 gap-28 gap-y-6 container ">
      {yearDays.map((month, i) => {
        const data = yearData.find(
          (item) => Object.entries(item)[0][0] === Object.entries(month)[0][0]
        );
        const monthData = data ? Object.entries(data)[0][1] : [];
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
