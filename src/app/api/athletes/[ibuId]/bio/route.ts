import { getAthleteBioByIBUId } from "@/lib/api/athletes";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ibuId: string }> },
) {
  const { ibuId } = await params;
  const bio = await getAthleteBioByIBUId(ibuId);
  if (!bio) {
    return new Response(JSON.stringify(null), { status: 200 });
  }
  return new Response(JSON.stringify(bio), { status: 200 });
}
