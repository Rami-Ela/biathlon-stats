import { AthleteBio } from "@/components/athletes/athleteBio";
import { AthleteStats } from "@/components/athletes/athleteStats";
import { AthleteDisciplineRankings } from "@/components/athletes/athleteDisciplineRankings";
import { getAthleteBioByIBUId } from "@/lib/api/athletes";
import { getCupRankingsForAthlete } from "@/lib/api/rankings";
import { DEFAULT_SEASON } from "@/types/competitions";

export default async function AthletePage({
  params,
  searchParams,
}: {
  params: Promise<{ ibuId: string }>;
  searchParams: Promise<{ name?: string; nat?: string }>;
}) {
  const { ibuId } = await params;
  const { name = "", nat = "" } = await searchParams;

  const [rankings, bio] = await Promise.all([
    getCupRankingsForAthlete({ ibuId, seasonId: DEFAULT_SEASON }),
    getAthleteBioByIBUId(ibuId).catch((error) => {
      console.error("Error fetching athlete bio", { ibuId, error });
      return null;
    }),
  ]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <AthleteBio
        bio={bio}
        fallbackName={name}
        fallbackNat={nat}
        ibuId={ibuId}
      />
      {bio && <AthleteStats bio={bio} />}
      <h2 className="text-lg font-semibold mb-4">Classements de la saison</h2>
      <AthleteDisciplineRankings rankings={rankings} />
    </div>
  );
}
