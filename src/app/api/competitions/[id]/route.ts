// /app/api/athletes/route.js

import { getRaceResult } from "@/lib/api/competitions";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Récupère l'ID depuis les paramètres de la route

    const raceResult = await getRaceResult({ raceId: id });
    return new Response(JSON.stringify(raceResult), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching race result" }),
      { status: 400 }
    );
  }
}
