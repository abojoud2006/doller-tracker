"use client";

import React from "react";
import { CircleCheck, CircleX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useData } from "@/app/context/Context";

export function DayBtn({ status, dayNumber = "", children }) {
  const { update } = useData();

  function handleClick(value) {
    update(dayNumber, value);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`size-12 rounded-full text-md ${status}`}>
          {children}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex gap-3 items-center text-gray-600 rounded-full">
        <DropdownMenuItem
          disabled={status === "done"}
          className="flex gap-2 items-center p-0 px-4 py-2 rounded-full focus:bg-green-100 focus:text-green-800 cursor-pointer"
          onClick={() => handleClick("done")}
        >
          <CircleCheck /> <span>Done</span>
        </DropdownMenuItem>
        <div className="bg-gray-200 h-8 w-[1px]"></div>

        <DropdownMenuItem
          disabled={status === "fail"}
          className="flex gap-2 items-center p-0 px-4 py-2 rounded-full focus:bg-red-100 focus:text-red-700 cursor-pointer"
          onClick={() => handleClick("fail")}
        >
          <CircleX /> <span>Fail</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
