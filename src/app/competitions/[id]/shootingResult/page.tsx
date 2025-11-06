import { RaceShootingResultTable } from "@/components/competitions/shootingResultTable";
import { RaceSkiResultTable } from "@/components/competitions/skiResultTable";
import { LinkWithSeason } from "@/components/season/linkWithSeason";
import { Button } from "@/components/ui/button";
import {
  Competition,
  RaceDetail,
  RaceShootingResultDetail,
} from "@/types/competitions";
import Link from "next/link";

interface SkiResultPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SkiResultPage({ params }: SkiResultPageProps) {
  const { id } = await params;
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
          <LinkWithSeason href={`/competitions/${id}/skiResult`}>
            {" "}
            Classement Ski{" "}
          </LinkWithSeason>
        </Button>
        <Button asChild>
          <LinkWithSeason href={`/competitions/${id}`}>
            {" "}
            Classement Global{" "}
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
