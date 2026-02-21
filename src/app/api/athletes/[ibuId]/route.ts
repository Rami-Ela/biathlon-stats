import { getAthleteByIBUId } from "@/lib/api/athletes";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ ibuId: string }> }
) {
  const { ibuId } = await params;
  const familyName = new URL(req.url).searchParams.get("fn") ?? "";
  const athlete = await getAthleteByIBUId({ ibuId, familyName });
  if (!athlete) {
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(athlete), { status: 200 });
}
