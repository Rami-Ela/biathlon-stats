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
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
import { getFlagCountry } from "@/utils/flags";
import { DEFAULT_SEASON } from "@/types/competitions";

interface EventsTableProps {
  events: Event[];
}

export function EventsTable({ events }: EventsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("seasonId") ?? DEFAULT_SEASON;

  return (
    <Table>
      <TableCaption>Liste des événements pour la saison en cours</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> Nom de l&apos;événement </TableHead>
          <TableHead> Date de l&apos;événement </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => {
          return (
            <TableRow
              onClick={() =>
                router.push(`/events/${event.EventId}?seasonId=${seasonId}`)
              }
              key={event.EventId}
            >
              <TableCell>
                {getFlagCountry(event.Nat)}
                {` ${event.ShortDescription}`}
              </TableCell>
              <TableCell>{`${formatFullDisplayDate(
                event.FirstCompetitionDate
              )} - ${formatFullDisplayDate(event.EndDate)}`}</TableCell>
              <TableCell>
                {event.IsCurrent ? (
                  <Badge variant={"destructive"}> En cours </Badge>
                ) : null}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
