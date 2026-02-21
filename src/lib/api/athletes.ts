// /lib/api/athletes.js
import { Athlete, CISBio } from "@/types/athletes";

export async function getAthletes() {
  const response = await fetch(
    "https://biathlonresults.com/modules/sportapi/api/Athletes?FamilyName=&GivenName=&RequestId=0",
    { cache: "no-store" },
  );

  const data = await response.json();
  return data.Athletes;
}

export async function getAthleteByIBUId({
  ibuId,
  familyName = "",
}: {
  ibuId: string;
  familyName?: string;
}): Promise<Athlete | null> {
  const response = await fetch(
    `https://biathlonresults.com/modules/sportapi/api/Athletes?FamilyName=${encodeURIComponent(familyName)}&GivenName=&RequestId=0`,
    { cache: "no-store" },
  );
  const data = await response.json();
  return (data.Athletes as Athlete[]).find((a) => a.IBUId === ibuId) ?? null;
}

export async function getAthleteBioByIBUId(
  ibuId: string,
): Promise<CISBio | null> {
  const response = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/CISBios?IBUId=${ibuId}`,
    { next: { revalidate: 3600 } },
  );
  if (!response.ok) return null;
  return response.json();
}
