// /app/api/athletes/route.js

import { getAthletes } from "@/lib/api/athletes";

export async function GET() {
  try {
    const athletes = await getAthletes();
    return new Response(JSON.stringify(athletes), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error fetching athletes data" }),
      { status: 400 }
    );
  }
}
