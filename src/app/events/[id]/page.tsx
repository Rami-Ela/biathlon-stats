import { CompetitionsTable } from "@/components/competitions/competitionsTable";
import { Competition, DEFAULT_SEASON, SeasonIds } from "@/types/competitions";
import { Event } from "@/types/events";

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ seasonId: string }>;
}
export default async function EventPage({
  params,
  searchParams,
}: EventPageProps) {
  const { id } = await params;
  const seasonId = (await searchParams).seasonId ?? DEFAULT_SEASON;

  const res = await fetch(
    `${process.env.DOMAIN_URL}/api/events/${id}?seasonId=${seasonId}`
  );
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
