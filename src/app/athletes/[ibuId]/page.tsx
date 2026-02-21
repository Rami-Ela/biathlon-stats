import { AthleteBio } from "@/components/athletes/athleteBio";
import { AthleteDisciplineRankings } from "@/components/athletes/athleteDisciplineRankings";
import { getCupRankingsForAthlete } from "@/lib/api/rankings";
import { Athlete } from "@/types/athletes";
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

  const rankings = await getCupRankingsForAthlete({
    ibuId,
    seasonId: DEFAULT_SEASON,
  });

  const athlete: Athlete = {
    IBUId: ibuId,
    Name: name,
    FamilyName: "",
    GivenName: "",
    NAT: nat,
    Birthdate: "",
    Age: 0,
    GenderId: 0,
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <AthleteBio athlete={athlete} />
      <h2 className="text-lg font-semibold mb-4">Classements de la saison</h2>
      <AthleteDisciplineRankings rankings={rankings} />
    </div>
  );
}
