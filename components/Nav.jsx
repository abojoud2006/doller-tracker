"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, CalendarDays } from "lucide-react";

function Nav() {
  const path = usePathname();
  return (
    <div className="flex flex-wrap gap-x-4 md:gap-x-14 gap-y-2 items-center">
      <Link href="/">
        <Image src="/logo.svg" width={100} height={100} alt="logo" />
      </Link>
      <div className="flex gap-3 md:gap-6">
        <Link
          href="/month"
          className={`flex gap-1 items-center hover:text-primary group ${
            path === "/month" && "text-primary"
          }`}
        >
          <CalendarDays size={20} />
          <span>Current Month</span>
        </Link>

        <Link
          href="/year"
          className={`flex gap-1 items-center hover:text-primary group ${
            path === "/year" && "text-primary"
          }`}
        >
          <LayoutGrid size={20} />
          <span>Year</span>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
