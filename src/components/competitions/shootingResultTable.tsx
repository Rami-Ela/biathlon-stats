"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useRouter } from "next/navigation";
import { RaceResult, ShootingResult } from "@/types/competitions";
import { getFlagCountry } from "@/utils/flags";
import { getCompetitionPoints } from "@/utils/competitionPoints";

interface RaceShootingResultTableProps {
  raceResults: ShootingResult[];
}

export function RaceShootingResultTable({
  raceResults,
}: RaceShootingResultTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableCaption>Résultats au tir</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> </TableHead>
          <TableHead> Athlète </TableHead>
          <TableHead> Temps de tir </TableHead>
          <TableHead> Tirs </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {raceResults.map((raceResult, index) => {
          return (
            <TableRow key={raceResult.IBUId}>
              <TableCell>{`${raceResult.ResultOrder}`}</TableCell>
              <TableCell>
                {getFlagCountry(raceResult.Nat)}
                <Link href={`/athletes/${raceResult.IBUId}?name=${encodeURIComponent(raceResult.Name)}&nat=${raceResult.Nat}`} className="hover:underline">
                  {raceResult.Name}
                </Link>
              </TableCell>
              <TableCell>
                {index === 0 ? raceResult.TotalTime : raceResult.Behind}
              </TableCell>
              <TableCell>{raceResult.Shootings}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
