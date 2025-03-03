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
import { useRouter } from "next/navigation";
import { RaceResult, ShootingResult } from "@/types/competitions";
import { getFlagCountry } from "@/utils/flags";

interface RaceShootingResultTableProps {
  raceResults: ShootingResult[];
}

export function RaceShootingResultTable({
  raceResults,
}: RaceShootingResultTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableCaption>Liste des événements pour la saison en cours</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> Classement </TableHead>
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
                <span> {raceResult.Name} </span>
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
