import { SeasonIds } from "@/types/competitions";
import { Event } from "@/types/events";

// /lib/api/athletes.js
export async function getEvents({
  seasonId,
  level,
}: {
  seasonId: string | null;
  level: string | null;
}): Promise<Event[]> {
  const response = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/Events?SeasonId=${seasonId}&level=${level}`,
    { cache: "no-store" }
  );

  const data = await response.json();
  return data;
}

export async function getEventWithDetailsById({
  eventId,
  seasonId,
}: {
  eventId: string;
  seasonId: string | null;
}) {
  const eventRes = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/Events?SeasonId=${seasonId}&level=1`,
    { cache: "no-store" }
  );

  const eventData: Event[] = await eventRes.json();

  const competitionsRes = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/Competitions?EventId=${eventId}`,
    { cache: "no-store" }
  );
  const competitionData = await competitionsRes.json();

  return {
    event: eventData.find((event) => event.EventId === eventId),
    competitions: competitionData,
  };
}
