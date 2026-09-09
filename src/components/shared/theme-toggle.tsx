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
      <Sun
        aria-hidden="true"
        className="size-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
      />

      <Moon
        aria-hidden="true"
        className="absolute size-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
      />

      <span className="sr-only">Toggle colour theme</span>
    </Button>
  );
}