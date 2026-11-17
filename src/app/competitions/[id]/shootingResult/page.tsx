import { RaceShootingResultTable } from "@/components/competitions/shootingResultTable";
import { DataUnavailable } from "@/components/common/dataUnavailable";
import { fetchJson } from "@/lib/api/fetchJson";
import { RaceShootingResultDetail } from "@/types/competitions";

interface ShootingResultPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShootingResultPage({
  params,
}: ShootingResultPageProps) {
  const { id } = await params;

  const race = await fetchJson<RaceShootingResultDetail>(
    `https://www.biathlonresults.com/modules/sportapi/api/AnalyticResults?RaceId=${id}&TypeId=STTM`,
    { cache: "no-store" }
  );
  if (!race?.Results || !race.Competition) return <DataUnavailable />;

  return (
    <RaceShootingResultTable
      raceResults={race.Results.filter(
        (raceResult) =>
          (race.Competition.DisciplineId !== "RL" &&
            race.Competition.DisciplineId !== "SR") ||
          raceResult.IsTeam
      )}
    />
  );
}
