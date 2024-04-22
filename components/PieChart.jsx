"use client";
import { useData } from "@/app/(root)/context/Context";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function PieChartElement(props) {
  const { goal } = useData();
  const size = props?.size;
  let doneValue;
  let remainValue;
  if (goal.percentage() <= 100) {
    doneValue = goal.percentage();
    remainValue = 100 - doneValue;
  } else if (goal.percentage() > 100) {
    doneValue = 100;
    remainValue = 0;
  }
  const data = [
    { name: "Done", value: doneValue, color: "#6366f1" },
    { name: "Remain", value: remainValue, color: "#e4e4e7" },
  ];

  return (
    <div>
      <div className={`relative ${size === "small" ? "size-10" : "size-28"}`}>
        {size !== "small" && (
          <div className="absolute flex items-center justify-center inset-0 text-gray-600">
            <span className="font-medium text-2xl">
              {goal.percentage() ? goal.percentage() : 0}
            </span>
            <small className="text-gray-500">%</small>
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={size !== "small" ? "80%" : "65%"}
              outerRadius={"100%"}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PieChartElement;
