"use client";
import { useData } from "@/app/(root)/context/Context";
import PieChart from "@/components/PieChart";
import { Bold, CloudHail, Wallet } from "lucide-react";

function GoalProgress() {
  const { goal } = useData();
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <PieChart size="medium" />
        <div className="text-gray-500">
          <h2 className="text-xl font-semibold text-gray-700">Goal Progress</h2>
          <div className="text-xl text-gray-500 flex gap-1 items-center mb-2">
            <Wallet size={22} />
            <span>
              <strong className="text-primary">{goal.balance()}</strong>
              <small className="font-normal">{goal.currency}</small> /{" "}
              <strong>{goal.target}</strong>
              <small className="font-normal">{goal.currency}</small>
            </span>
          </div>
          <p className="text-sm">keep going to achieve your amazing goal.</p>
        </div>
      </div>
      <div className="text-sm text-gray-500 flex flex-col gap-2">
        <div className="flex items-center gap-1 ">
          <span className="size-3 bg-primary rounded-full block"></span>
          <span className="text-nowrap">{goal.donePoints} Done</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="size-3 bg-red-300 rounded-full block"></span>
          <span className="text-nowrap">{goal.failPoints} Skiped</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="size-3 bg-gray-300 rounded-full block"></span>
          <span className="text-nowrap">{goal.remainPoints()} Remain</span>
        </div>
      </div>
    </div>
  );
}

export default GoalProgress;
