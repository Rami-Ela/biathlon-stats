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

interface EventsTableProps {
  events: Event[];
}

export function EventsTable({ events }: EventsTableProps) {
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
              onClick={() => router.push(`/events/${event.EventId}`)}
              key={event.EventId}
            >
              <TableCell>{`${event.ShortDescription}`}</TableCell>
              <TableCell>{`${formatFullDisplayDate(
                event.FirstCompetitionDate
              )} - ${formatFullDisplayDate(event.EndDate)}`}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
