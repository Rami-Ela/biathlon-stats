"use client";

import {
  formatFullDisplayDate,
  formatFullDisplayDateWithHour,
} from "@/lib/date";
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
import { Competition } from "@/types/competitions";
import { cx } from "class-variance-authority";
import clsx from "clsx";
import { ReactNode } from "react";
import { Badge } from "../ui/badge";

const getStatusLabel = (statusText: string) => {
  const statusTextMap: Record<string, ReactNode> = {
    Final: <Badge variant={"default"}> Terminée </Badge>,
    Running: <Badge variant={"destructive"}> En cours </Badge>,
    Unofficial: <Badge variant={"default"}> Clôture </Badge>,
  };
  return (
    statusTextMap[statusText] ?? <Badge variant={"outline"}> Prévu </Badge>
  );
};

interface CompetitionsTableProps {
  competitions: Competition[];
}

export function CompetitionsTable({ competitions }: CompetitionsTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableCaption>
        Liste des compétition pour l'événement séléctionné
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> Format </TableHead>
          <TableHead> Départ </TableHead>
          <TableHead> Statut </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {competitions.map((race) => {
          return (
            <TableRow
              key={race.RaceId}
              onClick={() => router.push(`/competitions/${race.RaceId}`)}
            >
              <TableCell>{`${race.ShortDescription}`}</TableCell>
              <TableCell>{`${formatFullDisplayDateWithHour(
                race.StartTime
              )}`}</TableCell>
              <TableCell className="flex flex-row justify-center">
                {getStatusLabel(race.StatusText)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
