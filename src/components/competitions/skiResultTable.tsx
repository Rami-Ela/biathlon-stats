"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { SkiResult } from "@/types/competitions";
import { getFlagCountry } from "@/utils/flags";

interface RaceSkiResultTableProps {
  raceResults: SkiResult[];
}

export function RaceSkiResultTable({ raceResults }: RaceSkiResultTableProps) {
  return (
    <Table>
      <TableCaption>Résultats sur les skis</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> </TableHead>
          <TableHead> Athlète </TableHead>
          <TableHead> Temps de course </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {raceResults.map((raceResult, index) => {
          return (
            <TableRow key={raceResult.IBUId}>
              <TableCell>{`${raceResult.ResultOrder}`}</TableCell>
              <TableCell>
                {getFlagCountry(raceResult.Nat)}
                <span> {raceResult.Name} </span>
              </TableCell>
              <TableCell>
                {index === 0 ? raceResult.TotalTime : raceResult.Behind}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
