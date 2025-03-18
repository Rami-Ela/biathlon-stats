import { EventsTable } from "@/components/events/eventsTable";
import { Event } from "@/types/events";

export default async function Home() {
  let athletes = [];
  let events: Event[] = [];
  try {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/athletes`, {
      cache: "no-store",
    });
    athletes = await res.json();
  } catch (error) {
    console.error("Erreur lors du fetch :", error);
  }
  try {
    const eventRes = await fetch(
      `${process.env.DOMAIN_URL}/api/events?seasonId=2425&level=1`,
      { cache: "no-store" }
    );
    events = await eventRes.json();
  } catch (error) {
    console.error("Erreur lors du fetch :", error);
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="font-bold"> Liste des courses </h1>

      <EventsTable events={events}></EventsTable>
    </div>
  );
}
