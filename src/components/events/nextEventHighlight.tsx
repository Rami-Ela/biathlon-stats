import { formatFullDisplayDate } from "@/lib/date";

import { Event } from "@/types/events";
import { getFlagCountry } from "@/utils/flags";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { LinkWithSeason } from "../season/linkWithSeason";
import { ArrowRight } from "lucide-react";

interface NextEventHighlightProps {
  seasonId: string;
}

export function getNextEvent(events: Event[]): {
  currentEvent: Event | null;
  incomingEvent: Event | null;
} {
  if (!events?.length) return { currentEvent: null, incomingEvent: null };

  const now = new Date();

  const currentEvent = events.find((event) => {
    const start = new Date(event.StartDate);
    const end = new Date(event.EndDate);
    return now >= start && end >= now;
  });

  if (currentEvent) {
    return {
      currentEvent,
      incomingEvent: null,
    };
  }

  const futureEvents = events.filter((event) => {
    const end = new Date(event.EndDate);
    return end >= now;
  });

  if (futureEvents.length === 0)
    return { currentEvent: null, incomingEvent: null };

  return { currentEvent: null, incomingEvent: futureEvents[0] };
}

export async function NextEventHighlight({
  seasonId,
}: NextEventHighlightProps) {
  let events: Event[] = [];

  try {
    const eventRes = await fetch(
      `${process.env.DOMAIN_URL}/api/events?seasonId=${seasonId}&level=1`,
      { cache: "no-store" }
    );
    events = await eventRes.json();
  } catch (error) {
    console.error("Erreur lors du fetch :", error);
  }

  const { incomingEvent, currentEvent } = getNextEvent(events);
  const highlightedEvent = currentEvent ?? incomingEvent;

  if (!highlightedEvent) return null;

  const flag = getFlagCountry(highlightedEvent.Nat);

  return (
    <Card className="w-full max-w-2xl mx-auto p-4 ">
      <CardHeader className="flex items-center gap-2 justify-center">
        <Badge variant={currentEvent ? "default" : "secondary"}>
          {currentEvent ? "Compétition en cours" : "Prochaine compétition"}
        </Badge>
        <CardTitle className="text-center text-2xl font-bold flex items-center gap-2">
          {flag} {highlightedEvent.ShortDescription}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground text-sm">
          {formatFullDisplayDate(highlightedEvent.FirstCompetitionDate)} —{" "}
          {formatFullDisplayDate(highlightedEvent.EndDate)}
        </p>

        {/* <LinkWithSeason
          href={`/events/${highlightedEvent.EventId}?seasonId=${seasonId}`}
          seasonId={seasonId}
        >
          {"Voir l'événement"}
          <ArrowRight size={16} />
        </LinkWithSeason> */}
      </CardContent>
    </Card>
  );
}
