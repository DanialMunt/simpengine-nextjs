"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { CalendarPlus, UserPlus, Bell } from "lucide-react";
import Link from "next/link";
import { ThemeSwitch } from "../themeSwitch";
import { useModalStore } from "@/stores/useModalStore";
const pathNameMap: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/simp-target": "Simp targets",
  "/romantic-event": "Romantic Events",
  "/calendar": "Calendar",
};

export default function Header() {
  const { open } = useModalStore();
  const pathname = usePathname();

  const pageName = pathNameMap[pathname] || "Page";

  return (
    <header className=" h-full flex justify-between items-center text-foreground text-xl font-medium p-4">
      <span className="lg:max-w-48 max-w-38 w-full truncate">{pageName}</span>
      
      <div className="flex gap-3 items-center">

          <Button asChild variant="default" onClick={open}>
            <div>
              <UserPlus />
              <span className="hidden lg:inline">Add new simp target</span>
            </div>
          </Button>
 

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
        <ThemeSwitch />
        <Bell className="h-[1.2rem] w-[1.2rem]" />
      </div>
    </header>
  );
}
