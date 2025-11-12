import {
  formatFullDisplayDate,
  formatFullDisplayDateWithHour,
} from "@/lib/date";

import { Event } from "@/types/events";
import { getFlagCountry } from "@/utils/flags";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Competition } from "@/types/competitions";
import AddToCalendar from "../calendar/addToCalendar";

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

export function getNextRace(competitions: Competition[]): Competition | null {
  if (!competitions?.length) return null;

  const now = new Date();

  const nextRace = competitions.find((competition) => {
    const start = new Date(competition.StartTime);
    return start >= now;
  });

  if (!nextRace) {
    return null;
  }
  return nextRace;
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

  const res = await fetch(
    `${process.env.DOMAIN_URL}/api/events/${highlightedEvent.EventId}?seasonId=${seasonId}`
  );

  const eventDetail: { event: Event; competitions: Competition[] } =
    await res.json();

  const nextRace = getNextRace(eventDetail.competitions);

  return (
    <Card className="w-full max-w-2xl mx-auto p-4">
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

        {nextRace ? (
          <Card className="w-full relative bg-slate-100 p-2 md:p-5">
            <CardHeader className="flex items-center justify-center">
              <div className="absolute right-2 top-2">
                <AddToCalendar
                  title={nextRace.ShortDescription}
                  startDate={nextRace.StartTime}
                  durationHours={1}
                  durationMinutes={0}
                  description={nextRace.Description}
                  location={nextRace.Location}
                  organizerName="IBU"
                  variant="default"
                ></AddToCalendar>
              </div>
              <Badge variant="default">Prochaine course</Badge>
              <CardTitle className="text-center text-lg font-bold flex items-center gap-2">
                {nextRace.ShortDescription}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <span>{`${formatFullDisplayDateWithHour(
                nextRace.StartTime
              )}`}</span>
            </CardContent>
          </Card>
        ) : null}
      </CardContent>
    </Card>
  );
}
