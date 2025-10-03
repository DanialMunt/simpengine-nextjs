"use client";

import { Button } from "@/components/ui/button/button";
import { usePathname } from "next/navigation";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
const pathNameMap: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/simp-target": "Simp targets",
  "/events": "Events",
};

export default function Header() {
  const pathname = usePathname();

  const pageName = pathNameMap[pathname] || "Page";

  return (
    <header className=" h-full flex justify-between items-center text-foreground text-xl font-medium p-4">
      <span>{pageName}</span>
      <div className="flex gap-3">
        
        <Button variant="default"><CirclePlus /><Link href="/onboarding/name" >Add new simp target</Link></Button>
         <Button variant="secondary"><CirclePlus /><Link href="/romantic-event/step-one" >Create new romantic event</Link></Button>
      </div>
    </header>
  );
}
