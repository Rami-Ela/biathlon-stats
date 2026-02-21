"use client";

import { formatFullDisplayDate } from "@/lib/date";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Event } from "@/types/events";
import { useRouter } from "next/navigation";
import { RaceResult } from "@/types/competitions";
import { getFlagCountry } from "@/utils/flags";
import { getCompetitionPoints } from "@/utils/competitionPoints";

interface RaceResultTableProps {
  raceResults: RaceResult[];
}

export function RaceResultTable({ raceResults }: RaceResultTableProps) {
  return (
    <Table>
      <TableCaption>Résultats de la course</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> </TableHead>
          <TableHead> Athlète </TableHead>
          <TableHead> Temps de course </TableHead>
          <TableHead> Tirs </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {raceResults.map((raceResult, index) => {
          const points = raceResult.ResultOrder
            ? getCompetitionPoints(raceResult.ResultOrder)
            : 0;
          return (
            <TableRow key={raceResult.IBUId}>
              <TableCell>{`${raceResult.ResultOrder}`}</TableCell>
              <TableCell>
                {getFlagCountry(raceResult.Nat)}
                <span> {raceResult.Name} </span>
              </TableCell>
              <TableCell>
                {index === 0 ? raceResult.TotalTime : raceResult.Behind}
                {points > 0 && (
                  <span className="text-muted-foreground"> ({points} pts)</span>
                )}
              </TableCell>
              <TableCell>{raceResult.Shootings}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
