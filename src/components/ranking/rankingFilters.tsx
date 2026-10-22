import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DisciplineCode,
  Gender,
  disciplines,
  genders,
} from "@/utils/rankingTypes";
import { ActiveTabScroller } from "./activeTabScroller";

interface Props {
  seasonId: string;
  gender: Gender;
  discipline: DisciplineCode;
}

function rankingHref(seasonId: string, gender: Gender, type: DisciplineCode) {
  const params = new URLSearchParams({ seasonId, gender, type });
  return `/ranking?${params.toString()}`;
}

export function RankingFilters({ seasonId, gender, discipline }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 rounded-lg bg-muted p-1 md:w-64">
        {genders.map((g) => (
          <Link
            key={g.id}
            href={rankingHref(seasonId, g.id, discipline)}
            aria-current={g.id === gender ? "page" : undefined}
            className={cn(
              "rounded-md py-1.5 text-center text-sm font-medium text-muted-foreground transition-colors",
              g.id === gender && "bg-background text-foreground shadow-sm",
            )}
          >
            {g.label}
          </Link>
        ))}
      </div>

      {/* Bleeds to the screen edges on mobile so the tabs can scroll horizontally */}
      <ActiveTabScroller className="-mx-4 overflow-x-auto border-b px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-5">
          {disciplines.map((d) => (
            <Link
              key={d.id}
              href={rankingHref(seasonId, gender, d.id)}
              aria-current={d.id === discipline ? "page" : undefined}
              className={cn(
                "-mb-px whitespace-nowrap border-b-2 border-transparent py-2 text-sm font-medium text-muted-foreground transition-colors",
                d.id === discipline && "border-primary text-foreground",
              )}
            >
              {d.label}
            </Link>
          ))}
        </div>
      </ActiveTabScroller>
    </div>
  );
}
