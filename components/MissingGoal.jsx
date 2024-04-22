import { Button } from "@/components/ui/button";
import AppSettings from "./AppSettings";
import Image from "next/image";

function MissingGoal() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 text-center h-2/3">
      <Image
        src="/noTarget.svg"
        alt="no target"
        width={40}
        height={40}
        className="size-40"
      />
      <h2 className="text-2xl font-medium">No goal available</h2>
      <p className="text-gray-400">
        To start using application please set your goal
      </p>

      <AppSettings position="missingGoal" />
    </div>
  );
}

export default MissingGoal;
