// /lib/api/athletes.js
export async function getCompetitions() {
  const response = await fetch(
    "https://www.biathlonresults.com/modules/sportapi/api/Competitions?EventId=BT2425SWRLCH__",
    { cache: "no-store" }
  );

  const data = await response.json();
  return data;
}

export async function getRaceResult({ raceId }: { raceId: string }) {
  const response = await fetch(
    `https://www.biathlonresults.com/modules/sportapi/api/Results?RaceId=${raceId}`,
    { cache: "no-store" }
  );
  const data = await response.json();
  return data;
}
