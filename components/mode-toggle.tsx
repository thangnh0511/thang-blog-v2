"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";


export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="light" size="sm">
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Theme Selection">
        <DropdownItem key="light" onClick={() => setTheme("light")}>
          Light
        </DropdownItem>
        <DropdownItem key="dark" onClick={() => setTheme("dark")}>
          Dark
        </DropdownItem>
        <DropdownItem key="system" onClick={() => setTheme("system")}>
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
