import { EventsTable } from "@/components/events/eventsTable";
import { DEFAULT_SEASON, SeasonIds } from "@/types/competitions";
import { Event } from "@/types/events";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ seasonId: string }>;
}) {
  let athletes = [];
  let events: Event[] = [];
  const seasonId = (await searchParams).seasonId ?? DEFAULT_SEASON;

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
      `${process.env.DOMAIN_URL}/api/events?seasonId=${seasonId}&level=1`,
      { cache: "no-store" }
    );
    events = await eventRes.json();
  } catch (error) {
    console.error("Erreur lors du fetch :", error);
  }

  return (
    <>
      <div className="px-4 flex flex-col items-center gap-10">
        <h1 className="text-2xl font-bold">Liste des courses</h1>
        <EventsTable events={events} seasonId={seasonId} />
      </div>
    </>
  );
}
