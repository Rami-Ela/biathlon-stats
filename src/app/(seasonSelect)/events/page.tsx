import { EventsTable } from "@/components/events/eventsTable";
import { DEFAULT_SEASON } from "@/types/competitions";
import { Event } from "@/types/events";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ seasonId: string }>;
}) {
  let events: Event[] = [];
  const seasonId = (await searchParams).seasonId ?? DEFAULT_SEASON;

  try {
    const eventRes = await fetch(
      `${process.env.DOMAIN_URL}/api/events?seasonId=${seasonId}&level=1`,
      { cache: "no-store" }
    );
    const data = await eventRes.json();
    if (eventRes.ok && Array.isArray(data)) {
      events = data;
    } else {
      console.error("Unexpected events response", eventRes.status, data);
    }
  } catch (error) {
    console.error("Erreur lors du fetch :", error);
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="font-bold"> Liste des courses </h1>

      <EventsTable events={events} seasonId={seasonId}></EventsTable>
    </div>
  );
}
