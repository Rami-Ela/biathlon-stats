import { EventsTable } from "@/components/events/eventsTable";
import { Event } from "@/types/events";

export default async function Home() {
  const res = await fetch("http://localhost:3001/api/athletes");
  const athletes = await res.json();

  const eventRes = await fetch(
    "http://localhost:3001/api/events?seasonId=2425&level=1"
  );
  const events: Event[] = await eventRes.json();

  console.log({ athletes });
  console.log({ events });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <EventsTable events={events}></EventsTable>
      </main>
    </div>
  );
}
