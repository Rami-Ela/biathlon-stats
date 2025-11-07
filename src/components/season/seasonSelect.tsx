"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_SEASON, sortedSeasons } from "@/types/competitions";

function formatSeasonLabel(id: string) {
  const start = id.slice(0, 2);
  const end = id.slice(2, 4);

  const startYear = +start < 50 ? `20${start}` : `19${start}`;
  const endYear = +end < 50 ? `20${end}` : `19${end}`;

  return `${startYear}-${endYear}`;
}

export default function SeasonSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("seasonId") ?? DEFAULT_SEASON;

  return (
    <Select
      onValueChange={(value) => {
        // Redirection client
        const params = new URLSearchParams(searchParams);
        params.set("seasonId", value); // met à jour le paramètre seasonId

        router.push(`${pathname}?${params.toString()}`);
      }}
      defaultValue={seasonId}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Saison" />
      </SelectTrigger>
      <SelectContent className="h-[300px]">
        {sortedSeasons.map((id) => (
          <SelectItem key={id} value={id}>
            {formatSeasonLabel(id)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
