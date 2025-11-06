import { RaceResultTable } from "@/components/competitions/resultTable";
import { LinkWithSeason } from "@/components/season/linkWithSeason";
import { Button } from "@/components/ui/button";
import { RaceDetail } from "@/types/competitions";
import Link from "next/link";

interface RacePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RacePage({ params }: RacePageProps) {
  const { id } = await params;
  const res = await fetch(`${process.env.DOMAIN_URL}/api/competitions/${id}`, {
    cache: "no-store",
  }); //TODO: variabiliser l'url de l'API (ça ne marchera qu'en local là)
  const race: RaceDetail = await res.json();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold"> {race.Competition.ShortDescription} </h1>
      <h2 className="font-semibold"> {race.SportEvt.ShortDescription} </h2>
      <div className="flex gap-3">
        <Button asChild>
          <LinkWithSeason href={`/competitions/${id}/skiResult`}>
            {" "}
            Classement Ski{" "}
          </LinkWithSeason>
        </Button>
        <Button asChild>
          <LinkWithSeason href={`/competitions/${id}/shootingResult`}>
            Classement Tir
          </LinkWithSeason>
        </Button>
      </div>

      <RaceResultTable
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
