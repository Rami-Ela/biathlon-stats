import { Event } from "@/types/events";

// /lib/api/athletes.js
export async function getEvents({
  seasonId,
  level,
}: {
  seasonId: string;
  level: string | null;
}): Promise<Event[]> {
  const response = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/Events?SeasonId=${seasonId}&level=${level}`,
    { cache: "no-store" },
  );

  const data = await response.json();
  if (!response.ok || !Array.isArray(data)) {
    throw new Error(`Unexpected Events response (status ${response.status})`);
  }
  return data;
}

export async function getEventWithDetailsById({
  eventId,
  seasonId,
}: {
  eventId: string;
  seasonId: string;
}) {
  const eventRes = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/Events?SeasonId=${seasonId}&level=1`,
    { cache: "no-store" },
  );

  const eventJson = await eventRes.json();
  const eventData: Event[] = Array.isArray(eventJson) ? eventJson : [];

  const competitionsRes = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/Competitions?EventId=${eventId}`,
    { cache: "no-store" },
  );
  const competitionJson = await competitionsRes.json();
  const competitionData = Array.isArray(competitionJson)
    ? competitionJson
    : null;

  return {
    event: eventData.find((event) => event.EventId === eventId),
    competitions: competitionData,
  };
}
