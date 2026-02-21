import { getCupRankingsForAthlete } from "@/lib/api/rankings";
import { DEFAULT_SEASON } from "@/types/competitions";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ ibuId: string }> }
) {
  const { ibuId } = await params;
  const { searchParams } = new URL(req.url);
  const seasonId = searchParams.get("seasonId") ?? DEFAULT_SEASON;
  const rankings = await getCupRankingsForAthlete({ ibuId, seasonId });
  return new Response(JSON.stringify(rankings), { status: 200 });
}
