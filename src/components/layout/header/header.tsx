"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { CalendarPlus, UserPlus, Bell } from "lucide-react";
import Link from "next/link";
import { ThemeSwitch } from "../themeSwitch";
const pathNameMap: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/simp-target": "Simp targets",
  "/romantic-event": "Romantic Events",
};

export default function Header() {
  const pathname = usePathname();

  const pageName = pathNameMap[pathname] || "Page";

  return (
    <header className=" h-full flex justify-between items-center text-foreground text-xl font-medium p-4">
      <span className="max-w-48 w-full truncate">{pageName}</span>
      <ThemeSwitch />
      <div className="flex gap-3 items-center">
        <Link href="/romantic-event/step-one" passHref>
          <Button asChild variant="default">
            <div>
              <UserPlus />
              <span className="hidden lg:inline">Add new simp target</span>
            </div>
          </Button>
        </Link>

        <Link href="/romantic-event-creation/step-one" passHref>
          <Button asChild variant="secondary">
            <div>
              <CalendarPlus />
              <span className="hidden lg:inline">
                Create new romantic event
              </span>
            </div>
          </Button>
        </Link>
        <Bell className="h-[1.2rem] w-[1.2rem]" />
      </div>
    </header>
  );
}
