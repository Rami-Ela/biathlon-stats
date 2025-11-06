import { getEvents } from "@/lib/api/events";
import { DEFAULT_SEASON } from "@/types/competitions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const seasonId = searchParams.get("seasonId") ?? DEFAULT_SEASON;
    const level = searchParams.get("level") ?? "1";

    const events = await getEvents({ seasonId, level });
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching competitions data" }),
      { status: 400 }
    );
  }
}
