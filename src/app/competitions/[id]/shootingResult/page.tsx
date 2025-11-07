import { RaceShootingResultTable } from "@/components/competitions/shootingResultTable";
import { LinkWithSeason } from "@/components/season/linkWithSeason";
import { Button } from "@/components/ui/button";
import { DEFAULT_SEASON, RaceShootingResultDetail } from "@/types/competitions";

interface SkiResultPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ seasonId: string }>;
}

export default async function SkiResultPage({
  params,
  searchParams,
}: SkiResultPageProps) {
  const { id } = await params;
  const seasonId = (await searchParams).seasonId ?? DEFAULT_SEASON;

  const res = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/AnalyticResults?RaceId=${id}&TypeId=STTM`,
    { cache: "no-store" }
  );
  const race: RaceShootingResultDetail = await res.json(); // revoir le type

  return (
    <div className="flex flex-col items-center gap-4">
      <p> {race.Competition.ShortDescription} </p>
      <p> {race.SportEvt.ShortDescription} </p>
      <div className="flex gap-3">
        <Button asChild>
          <LinkWithSeason
            href={`/competitions/${id}/skiResult`}
            seasonId={seasonId}
          >
            Classement Ski
          </LinkWithSeason>
        </Button>
        <Button asChild>
          <LinkWithSeason href={`/competitions/${id}`} seasonId={seasonId}>
            Classement Global
          </LinkWithSeason>
        </Button>
      </div>

      <RaceShootingResultTable
        raceResults={race.Results.filter(
          (raceResult) =>
            (race.Competition.DisciplineId !== "RL" &&
              race.Competition.DisciplineId !== "SR") ||
            raceResult.IsTeam
        )}
      />
    </div>
  );
}
