"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { DEFAULT_SEASON } from "@/types/competitions";

const TABS = [
  { label: "Global", segment: "" },
  { label: "Ski", segment: "skiResult" },
  { label: "Tir", segment: "shootingResult" },
] as const;

interface RaceViewTabsProps {
  raceId: string;
}

export function RaceViewTabs({ raceId }: RaceViewTabsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("seasonId") ?? DEFAULT_SEASON;

  return (
    <div className="inline-flex h-12 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
      {TABS.map(({ label, segment }) => {
        const href = `/competitions/${raceId}${segment ? `/${segment}` : ""}?seasonId=${seasonId}`;
        const isActive = segment
          ? pathname.endsWith(segment)
          : pathname === `/competitions/${raceId}`;

        return (
          <Link
            key={segment}
            href={href}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2 text-base font-medium transition-all",
              isActive
                ? "bg-background text-foreground shadow"
                : "hover:text-foreground"
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
