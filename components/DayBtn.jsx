"use client";

import React, { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DayBtn({ status, children }) {
  const [done, setDone] = useState(status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`size-12 rounded-full  ${done}`}>{children}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex gap-3 items-center text-gray-600 rounded-full">
        <DropdownMenuItem
          disabled={done === "done"}
          className="flex gap-2 items-center p-0 px-4 py-2 rounded-full focus:bg-green-100 focus:text-green-800"
          onClick={() => setDone("done")}
        >
          <CircleCheck /> <span>Done</span>
        </DropdownMenuItem>
        <div className="bg-gray-200 h-8 w-[1px]"></div>

        <DropdownMenuItem
          disabled={done === "fail"}
          className="flex gap-2 items-center p-0 px-4 py-2 rounded-full focus:bg-red-100 focus:text-red-700"
          onClick={() => setDone("fail")}
        >
          <CircleX /> <span>Fail</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
