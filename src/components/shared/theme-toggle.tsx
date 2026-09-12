"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative rounded-full"
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
    >
      <Sun aria-hidden="true" className="size-5 scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />

      <Moon aria-hidden="true" className="absolute size-5 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />

      <span className="sr-only">Toggle colour theme</span>
    </Button>
  );
}
