import { getEvents } from "@/lib/api/events";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const seasonId = searchParams.get("seasonId");
    const level = searchParams.get("level");

    const events = await getEvents({ seasonId, level });
    console.log({ events });
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching competitions data" }),
      { status: 400 }
    );
  }
}
