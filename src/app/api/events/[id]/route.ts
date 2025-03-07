import { getEventWithDetailsById } from "@/lib/api/events";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Missing eventId param" }),
        { status: 400 }
      );
    }

    const { event, competitions } = await getEventWithDetailsById({
      eventId: id,
    });

    // Vérification que l'événement a été trouvé
    if (!event || !competitions) {
      return new Response(JSON.stringify({ message: "Event not found" }), {
        status: 404,
      });
    }

    // Corriger le statut ici pour indiquer une réponse réussie
    return new Response(JSON.stringify({ event, competitions }), {
      status: 200,
    });
  } catch (error) {
    console.error(error); // Ajoute un log pour débuguer
    return new Response(
      JSON.stringify({ message: "Error while fetching event" }),
      { status: 500 }
    );
  }
}
