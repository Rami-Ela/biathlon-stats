import { RaceResultTable } from "@/components/competitions/resultTable";
import { RaceDetail } from "@/types/competitions";

interface RacePageProps {
  params: Promise<{ id: string }>;
}

export default async function RacePage({ params }: RacePageProps) {
  const { id } = await params;

  const res = await fetch(`${process.env.DOMAIN_URL}/api/competitions/${id}`, {
    cache: "no-store",
  });
  const race: RaceDetail = await res.json();

  return (
    <RaceResultTable
      raceResults={race.Results.filter(
        (raceResult) =>
          (race.Competition.DisciplineId !== "RL" &&
            race.Competition.DisciplineId !== "SR") ||
          raceResult.IsTeam,
      )}
    />
  );
}
