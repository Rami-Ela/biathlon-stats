"use client";

import { formatFullDisplayDateWithHour } from "@/lib/date";
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
import { Competition } from "@/types/competitions";
import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import AddToCalendar from "../calendar/addToCalendar";

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
  seasonId: string;
}

export function CompetitionsTable({
  competitions,
  seasonId,
}: CompetitionsTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableCaption>
        Liste des compétition pour l&apos;événement séléctionné
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
              onClick={() =>
                router.push(`/competitions/${race.RaceId}?seasonId=${seasonId}`)
              }
            >
              <TableCell>{`${race.ShortDescription}`}</TableCell>
              <TableCell>{`${formatFullDisplayDateWithHour(
                race.StartTime
              )}`}</TableCell>
              <TableCell>{getStatusLabel(race.StatusText)}</TableCell>
              <TableCell>
                <AddToCalendar
                  title={race.ShortDescription}
                  startDate={race.StartTime}
                  durationHours={1}
                  durationMinutes={0}
                  description={race.Description}
                  location={race.Location}
                  organizerName="IBU"
                ></AddToCalendar>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
