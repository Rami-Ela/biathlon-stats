import { NextRequest, NextResponse } from "next/server";
import { createEvent, EventAttributes, EventStatus } from "ics";

function normalizeStatus(input?: string): EventStatus | undefined {
  if (!input) return undefined;
  switch (input.toLowerCase()) {
    case "confirmed":
      return "CONFIRMED";
    case "tentative":
      return "TENTATIVE";
    case "cancelled":
      return "CANCELLED";
    default:
      return undefined;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") ?? "Nouvel événement";
    const date = searchParams.get("startDate"); // ISO string
    const durationMinutes = Number(searchParams.get("duration") ?? 60);
    const description = searchParams.get("description") ?? "";
    const location = searchParams.get("location") ?? "";
    const url = searchParams.get("url") ?? "";
    const status = normalizeStatus(searchParams.get("status") ?? undefined);

    if (!date) {
      return NextResponse.json({ error: "Missing date" }, { status: 400 });
    }

    const startDate = new Date(date);

    const start: EventAttributes["start"] = [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
    ];

    const event: EventAttributes = {
      title,
      start,
      duration: { minutes: durationMinutes },
      description,
      location,
      ...(url ? { url } : {}),
      status,
    };

    const { error, value } = createEvent(event);

    if (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return new NextResponse(value, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          title
        )}.ics"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
