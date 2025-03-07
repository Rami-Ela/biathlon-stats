import { getRaceResult } from "@/lib/api/competitions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Récupérer l'ID depuis l'URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing race ID" }), {
        status: 400,
      });
    }

    const raceResult = await getRaceResult({ raceId: id });
    return new Response(JSON.stringify(raceResult), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error fetching race result" }),
      { status: 500 }
    );
  }
}
