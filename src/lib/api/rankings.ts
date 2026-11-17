import { CupRanking } from "@/types/rankings";
import { AthleteSeasonRankings } from "@/types/athletes";
import { fetchJson } from "./fetchJson";

const CUP_TYPES = [
  "SWTS",
  "SWSP",
  "SWPU",
  "SWIN",
  "SWMS",
  "SWRL",
  "SMTS",
  "SMSP",
  "SMPU",
  "SMIN",
  "SMMS",
  "SMRL",
] as const;

export async function getCupRankingsForAthlete({
  ibuId,
  seasonId,
}: {
  ibuId: string;
  seasonId: string;
}): Promise<AthleteSeasonRankings> {
  const results = await Promise.all(
    CUP_TYPES.map(async (type) => {
      const ranking = await fetchJson<CupRanking>(
        `https://www.biathlonresults.com/modules/sportapi/api/CupResults?CupId=BT${seasonId}SWRLCP__${type}`,
        { cache: "no-store" }
      );
      if (!ranking?.Rows) return null;
      const row = ranking.Rows.find((r) => r.IBUId === ibuId) ?? null;
      if (!row) return null;
      return {
        type,
        cupName: ranking.CupName,
        row: {
          Rank: row.Rank,
          Score: row.Score,
          IBUId: row.IBUId,
          Nat: row.Nat,
          RnkDiff: row.RnkDiff,
        },
      };
    })
  );
  return results.filter(Boolean) as AthleteSeasonRankings;
}
