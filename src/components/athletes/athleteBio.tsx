import Image from "next/image";
import { CISBio } from "@/types/athletes";
import { getFlagCountry } from "@/utils/flags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AthleteBioProps {
  bio: CISBio | null;
  fallbackName: string;
  fallbackNat: string;
  ibuId: string;
}

function formatBirthdate(raw: string): string {
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatGender(genderId: string): string {
  if (genderId === "M") return "Homme";
  if (genderId === "F") return "Femme";
  return "";
}

function getPersonalValue(
  items: CISBio["Personal"],
  description: string,
): string | undefined {
  return items.find((i) => i.Description === description)?.Value;
}

export function AthleteBio({
  bio,
  fallbackName,
  fallbackNat,
  ibuId,
}: AthleteBioProps) {
  console.log({ bio });
  if (!bio) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            {fallbackNat && getFlagCountry(fallbackNat)}
            <span>{fallbackName || ibuId}</span>
          </CardTitle>
        </CardHeader>
        {fallbackNat && (
          <CardContent className="text-sm text-muted-foreground">
            <span>Nationalité : {fallbackNat}</span>
          </CardContent>
        )}
      </Card>
    );
  }

  const birthdate = formatBirthdate(bio.Birthdate);
  const gender = formatGender(bio.GenderId);
  const bornIn = getPersonalValue(bio.Personal, "Born in");
  const residence = getPersonalValue(bio.Personal, "Residence");
  const profession = getPersonalValue(bio.Personal, "Profession");
  const languages = getPersonalValue(bio.Personal, "Languages");
  const club = getPersonalValue(bio.Sport, "Club");
  const wcDebut = getPersonalValue(bio.Sport, "WC debut");
  const biathSince = getPersonalValue(bio.Sport, "Biath.since");
  const wcStarts = bio.Stats.find((s) => s.Description === "WC Starts")?.Value;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-3xl flex flex-wrap items-center gap-2 mb-1">
              {getFlagCountry(bio.NAT)}
              <span>{bio.FullName || ibuId}</span>
            </CardTitle>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {bio.Bibs?.map((bib) => (
                <span
                  key={bib.Code}
                  title={bib.Description}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold text-black"
                  style={{ backgroundColor: bib.Color }}
                >
                  {bib.Description}
                </span>
              ))}
            </div>
          </div>
          {bio.PhotoURI && (
            <div className="shrink-0">
              <Image
                src={bio.PhotoURI}
                alt={bio.FullName}
                width={120}
                height={160}
                className="rounded object-cover"
                unoptimized
              />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
          <div className="space-y-1">
            {gender && <InfoRow label="Genre" value={gender} />}
            {bio.Age > 0 && <InfoRow label="Âge" value={String(bio.Age)} />}
            {birthdate && <InfoRow label="Né(e) le" value={birthdate} />}
            {bornIn && <InfoRow label="Ville natale" value={bornIn} />}
            {residence && <InfoRow label="Résidence" value={residence} />}
            {profession && <InfoRow label="Profession" value={profession} />}
            {languages && <InfoRow label="Langues" value={languages} />}
          </div>
          <div className="space-y-1">
            {club && <InfoRow label="Club" value={club} />}
            {wcDebut && <InfoRow label="Début en CdM" value={wcDebut} />}
            {biathSince && (
              <InfoRow label="Biathlète depuis" value={biathSince} />
            )}
            {wcStarts && <InfoRow label="Départs CdM" value={wcStarts} />}
          </div>
        </div>

        {bio.Badges.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {bio.Badges.map((badge) => (
              <Badge key={badge.Code} variant="secondary" title={badge.Value}>
                {badge.Description}
                {badge.Value && (
                  <span className="ml-1 text-muted-foreground">
                    · {badge.Value}
                  </span>
                )}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-1 text-sm">
      <span className="text-muted-foreground shrink-0">{label} :</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
