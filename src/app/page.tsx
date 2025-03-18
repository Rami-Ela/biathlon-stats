import { EventsTable } from "@/components/events/eventsTable";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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
    <>
      <div className="px-4 flex flex-col items-center gap-10">
        <h1 className="text-2xl font-bold">Liste des courses</h1>
        <EventsTable events={events} />
      </div>
    </>
  );
}
