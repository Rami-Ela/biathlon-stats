"use client";

import { useSearchParams } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { DEFAULT_SEASON } from "@/types/competitions";
import { NavigationMenuLinkWithSeason } from "../season/linkWithSeason";

export default function NavMenu() {
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("seasonId") ?? DEFAULT_SEASON;

  return (
    <nav className="w-full bg-cyan-600 text-white shadow-md z-50">
      <div className="max-w-4xl p-4 flex items-center">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLinkWithSeason
                href="/events"
                className="p-2 hover:bg-cyan-500 rounded-md transition"
                seasonId={seasonId}
              >
                Événements
              </NavigationMenuLinkWithSeason>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLinkWithSeason
                href="/ranking"
                className="p-2 hover:bg-cyan-500 rounded-md transition"
                seasonId={seasonId}
              >
                Classement
              </NavigationMenuLinkWithSeason>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
