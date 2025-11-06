"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_SEASON, SeasonIds } from "@/types/competitions";

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
      <SelectContent>
        <SelectItem value={SeasonIds[2324]}>2023-2024</SelectItem>
        <SelectItem value={SeasonIds[2425]}>2024-2025</SelectItem>
        <SelectItem value={SeasonIds[2526]}>2025-2026</SelectItem>
      </SelectContent>
    </Select>
  );
}
