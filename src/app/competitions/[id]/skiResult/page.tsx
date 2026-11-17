import { RaceSkiResultTable } from "@/components/competitions/skiResultTable";
import { DataUnavailable } from "@/components/common/dataUnavailable";
import { fetchJson } from "@/lib/api/fetchJson";
import { RaceSkiResultDetail } from "@/types/competitions";

interface SkiResultPageProps {
  params: Promise<{ id: string }>;
}

export default async function SkiResultPage({ params }: SkiResultPageProps) {
  const { id } = await params;

  const race = await fetchJson<RaceSkiResultDetail>(
    `https://www.biathlonresults.com/modules/sportapi/api/AnalyticResults?RaceId=${id}&TypeId=CRST`,
    { cache: "no-store" }
  );
  if (!race?.Results || !race.Competition) return <DataUnavailable />;

  return (
    <RaceSkiResultTable
      raceResults={race.Results.filter(
        (raceResult) =>
          (race.Competition.DisciplineId !== "RL" &&
            race.Competition.DisciplineId !== "SR") ||
          raceResult.IsTeam
      )}
    />
  );
}
