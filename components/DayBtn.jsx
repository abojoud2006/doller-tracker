"use client";

import React from "react";
import { CircleCheck, CircleX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";
import { useData } from "@/app/(root)/context/Context";

export function DayBtn({ status, dayNumber = "", monthNumber = "", children }) {
  const { update, goal } = useData();
  const target = goal.target;
  function handleClick(type) {
    update(dayNumber, monthNumber, type);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`size-10 lg:size-12 rounded-full text-md disabled:pointer-events-none ${status}`}
          disabled={!target}
        >
          {children}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" text-gray-600 rounded-full">
        {status !== "done" && (
          <DropdownMenuItem
            disabled={status === "done"}
            className="flex gap-3 items-center justify-center py-2 rounded-full focus:bg-indigo-100 focus:text-indigo-700 cursor-pointer text-primary "
            onClick={() => handleClick("done")}
          >
            <CircleCheck /> <span>Done</span>
          </DropdownMenuItem>
        )}

        {status === "done" && (
          <DropdownMenuItem
            disabled={status === "fail"}
            className="flex gap-3 items-center justify-center py-2 rounded-full focus:bg-red-100  cursor-pointer text-red-600 focus:text-red-700"
            onClick={() => handleClick("fail")}
          >
            <CircleX /> <span>Fail</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuArrow />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
