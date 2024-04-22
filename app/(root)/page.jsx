"use client";
import MonthView from "@/components/MonthView";
import { useData } from "./context/Context";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { Goal } from "lucide-react";
import MissingGoal from "@/components/MissingGoal";

export default function Home() {
  const { toast } = useToast();
  const { yearPoints, goal, isLoading } = useData();
  const target = goal.target > 0;
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthPoints = yearPoints[currentMonth] || [];
  useEffect(() => {
    toast({
      duration: 10000,
      title: "Dont forget to back tomorrow",
      description: (
        <div className="inline-flex gap-6 items-center justify-between">
          <p>
            keep going to achieve your goal.
            <br />
            There is only a little left to arrive
          </p>
          <Goal
            size={45}
            strokeWidth={1.3}
            className="text-indigo-600 shrink-0"
          />
        </div>
      ),
    });
  }, []);

  return (
    <div className="container flex justify-center h-full">
      {!target && !isLoading ? (
        <MissingGoal />
      ) : (
        <MonthView month={currentMonth} monthPoints={currentMonthPoints} />
      )}
    </div>
  );
}
