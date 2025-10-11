"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2 relative">
        <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden />
        <Switch id="theme-switch" checked={false} onCheckedChange={() => {}} />
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center space-x-2 relative">
      <Sun className="h-[1.2rem] w-[1.2rem] transition-transform " />

      <Switch
        id="theme-switch"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon className="h-[1.2rem] w-[1.2rem] transition-transform" />
    </div>
  );
}
