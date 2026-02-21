import { RaceSkiResultTable } from "@/components/competitions/skiResultTable";
import { RaceSkiResultDetail } from "@/types/competitions";

interface SkiResultPageProps {
  params: Promise<{ id: string }>;
}

export default async function SkiResultPage({ params }: SkiResultPageProps) {
  const { id } = await params;

  const res = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/AnalyticResults?RaceId=${id}&TypeId=CRST`,
    { cache: "no-store" }
  );
  const race: RaceSkiResultDetail = await res.json();

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
