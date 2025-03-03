// /app/api/athletes/route.js

import { getCompetitions } from "@/lib/api/competitions";

export async function GET() {
  try {
    const competitions = await getCompetitions();
    return new Response(JSON.stringify(competitions), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching competitions data" }),
      { status: 400 }
    );
  }
}
