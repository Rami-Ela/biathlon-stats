import { CalendarPlus } from "lucide-react";
import { Button } from "../ui/button";

type AddToCalendarProps = {
  title: string;
  startDate: string; // ISO string
  durationHours?: number; // optional
  durationMinutes?: number;
  description?: string;
  location?: string;
  organizerName?: string;
  organizerEmail?: string;
  eventUrl?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
};

export default function AddToCalendar({
  title,
  startDate,
  durationHours = 1,
  durationMinutes = 0,
  description,
  location,
  organizerName,
  organizerEmail,
  eventUrl,
  variant,
}: AddToCalendarProps) {
  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const params = new URLSearchParams({
      title,
      startDate,
      durationHours: durationHours.toString(),
      durationMinutes: durationMinutes.toString(),
    });

    if (description) params.append("description", description);
    if (location) params.append("location", location);
    if (organizerName) params.append("organizerName", organizerName);
    if (organizerEmail) params.append("organizerEmail", organizerEmail);
    if (eventUrl) params.append("eventUrl", eventUrl);

    const url = `/api/calendar?${params.toString()}`;
    window.open(url, "_blank");
  };

  return (
    <Button onClick={handleClick} variant={variant}>
      <CalendarPlus />
    </Button>
  );
}
