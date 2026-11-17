import { RaceResultTable } from "@/components/competitions/resultTable";
import { DataUnavailable } from "@/components/common/dataUnavailable";
import { fetchJson } from "@/lib/api/fetchJson";
import { RaceDetail } from "@/types/competitions";

interface RacePageProps {
  params: Promise<{ id: string }>;
}

export default async function RacePage({ params }: RacePageProps) {
  const { id } = await params;

  const race = await fetchJson<RaceDetail>(
    `${process.env.DOMAIN_URL}/api/competitions/${id}`,
    { cache: "no-store" },
  );
  if (!race?.Results || !race.Competition) return <DataUnavailable />;

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
