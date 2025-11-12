"use client";

import { useSearchParams } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DEFAULT_SEASON } from "@/types/competitions";
import { NavigationMenuLinkWithSeason } from "../season/linkWithSeason";
import { cn } from "@/lib/utils";

export default function NavMenu() {
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("seasonId") ?? DEFAULT_SEASON;

  const menuItems = [
    { href: "/", label: "Accueil" },
    { href: "/events", label: "Événements" },
    { href: "/ranking", label: "Classement" },
  ];

  return (
    <nav className="w-full sticky top-0 border-b bg-white/80 backdrop-blur">
      <div className="max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLinkWithSeason
                  href={item.href}
                  seasonId={seasonId}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    "hover:bg-cyan-100 hover:text-cyan-700",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  )}
                >
                  {item.label}
                </NavigationMenuLinkWithSeason>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
