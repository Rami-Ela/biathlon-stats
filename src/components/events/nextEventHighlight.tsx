import { formatFullDisplayDate } from "@/lib/date";

import { Event } from "@/types/events";
import { getFlagCountry } from "@/utils/flags";

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

  const highlitedEvent = currentEvent ?? incomingEvent;

  if (!highlitedEvent) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 items-center p-5 border rounded-md">
      <h2 className="text-2xl font-semibold">
        {currentEvent !== null
          ? "Compétition en cours"
          : "Prochaine compétiton"}
      </h2>
      <div className="text-2xl font-bold">
        {getFlagCountry(highlitedEvent.Nat)}
        {` ${highlitedEvent.ShortDescription}`}
      </div>
      <div className="text-center">
        {`${formatFullDisplayDate(
          highlitedEvent.FirstCompetitionDate
        )} - ${formatFullDisplayDate(highlitedEvent.EndDate)}`}
      </div>
    </div>
  );
}
