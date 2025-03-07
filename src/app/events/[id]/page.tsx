import { CompetitionsTable } from "@/components/competitions/competitionsTable";
import { Competition } from "@/types/competitions";
import { Event } from "@/types/events";

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3001/api/events/${id}`);
  const eventDetail: { event: Event; competitions: Competition[] } =
    await res.json();

  return (
    <div className="flex flex-col items-center gap-4">
      <p> {eventDetail.event.Description} </p>
      <p> {eventDetail.event.ShortDescription} </p>
      <CompetitionsTable competitions={eventDetail.competitions} />
    </div>
  );
}
