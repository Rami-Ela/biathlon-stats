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
import { Badge } from "../ui/badge";
import { getFlagCountry } from "@/utils/flags";

interface EventsTableProps {
  events: Event[];
  seasonId: string;
}

export function EventsTable({ events, seasonId }: EventsTableProps) {
  const router = useRouter();

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
