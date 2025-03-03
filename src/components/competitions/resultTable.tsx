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

interface RaceResultTableProps {
  raceResults: RaceResult[];
}

export function RaceResultTable({ raceResults }: RaceResultTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableCaption>Liste des événements pour la saison en cours</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> Classement </TableHead>
          <TableHead> Athlète </TableHead>
          <TableHead> Temps de course </TableHead>
          <TableHead> Tirs </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {raceResults.map((raceResult) => {
          return (
            <TableRow key={raceResult.IBUId}>
              <TableCell>{`${raceResult.ResultOrder}`}</TableCell>
              <TableCell>
                {getFlagCountry(raceResult.Nat)}
                <span> {raceResult.Name} </span>
              </TableCell>
              <TableCell>{raceResult.Result}</TableCell>
              <TableCell>{raceResult.Shootings}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
