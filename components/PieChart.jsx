"use client";
import { useData } from "@/app/(root)/context/Context";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
const data = [
  { name: "Done", value: 80, color: "#6366f1" },
  { name: "Remain", value: 20, color: "#e4e4e7" },
];

function PieChartElement() {
  const { goal } = useData();
  return (
    <div>
      <div className="lg:size-28 size-20 relative">
        <div className="absolute flex items-center justify-center inset-0 text-gray-600">
          <span className="font-medium text-2xl">{goal.percentage}</span>
          <small className="text-gray-500">%</small>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={"80%"}
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
