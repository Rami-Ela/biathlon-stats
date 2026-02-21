import { RaceShootingResultTable } from "@/components/competitions/shootingResultTable";
import { RaceShootingResultDetail } from "@/types/competitions";

interface ShootingResultPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShootingResultPage({
  params,
}: ShootingResultPageProps) {
  const { id } = await params;

  const res = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/AnalyticResults?RaceId=${id}&TypeId=STTM`,
    { cache: "no-store" }
  );
  const race: RaceShootingResultDetail = await res.json();

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
