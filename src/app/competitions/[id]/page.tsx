import { RaceResultTable } from "@/components/competitions/resultTable";
import { Button } from "@/components/ui/button";
import { Competition, RaceDetail } from "@/types/competitions";
import { Event } from "@/types/events";
import Link from "next/link";

interface RacePageProps {
  params: {
    id: string;
  };
}
export default async function RacePage({ params }: RacePageProps) {
  const { id } = params;
  const res = await fetch(`http://localhost:3001/api/competitions/${id}`); //TODO: variabiliser l'url de l'API (ça ne marchera qu'en local là)
  const race: RaceDetail = await res.json();

  console.log({ race });

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold"> {race.Competition.ShortDescription} </h1>
      <h2 className="font-semibold"> {race.SportEvt.ShortDescription} </h2>
      <div className="flex gap-3">
        <Button asChild>
          <Link href={`/competitions/${id}/skiResult`}> Classement Ski </Link>
        </Button>
        <Button asChild>
          <Link href={`/competitions/${id}/skiResult`}> Classement Tir </Link>
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
