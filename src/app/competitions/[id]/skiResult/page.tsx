import { RaceSkiResultTable } from "@/components/competitions/skiResultTable";
import { Button } from "@/components/ui/button";
import {
  Competition,
  RaceDetail,
  RaceSkiResultDetail,
} from "@/types/competitions";
import Image from "next/image";
import Link from "next/link";

interface SkiResultPageProps {
  params: {
    id: string;
  };
}

export default async function SkiResultPage({ params }: SkiResultPageProps) {
  const { id } = params;
  const res = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/AnalyticResults?RaceId=${id}&TypeId=CRST`
  );
  const race: RaceSkiResultDetail = await res.json(); // revoir le type

  console.log({ race });

  return (
    <div className="flex flex-col items-center gap-4">
      <p> {race.Competition.ShortDescription} </p>
      <p> {race.SportEvt.ShortDescription} </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href={`/competitions/${id}`}> Classement Global </Link>
        </Button>
        <Button asChild>
          <Link href={`/competitions/${id}/shootingResult`}>
            Classement Tir
          </Link>
        </Button>
      </div>

      <RaceSkiResultTable
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
