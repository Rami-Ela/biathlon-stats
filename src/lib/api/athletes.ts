// /lib/api/athletes.js
export async function getAthletes() {
  const response = await fetch(
    "https://biathlonresults.com/modules/sportapi/api/Athletes?FamilyName=&GivenName=&RequestId=0",
    { cache: "no-store" }
  );

  const data = await response.json();
  return data.Athletes;
}
