import { Athlete } from "@/types/athletes";
import { getFlagCountry } from "@/utils/flags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AthleteBioProps {
  athlete: Athlete;
}

export function AthleteBio({ athlete }: AthleteBioProps) {
  console.log(athlete);
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          {getFlagCountry(athlete.NAT)}
          <span>{athlete.Name || athlete.IBUId}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground">
        {athlete.NAT && <span>Nationalité : {athlete.NAT}</span>}
        {athlete.Birthdate && (
          <span>Date de naissance : {athlete.Birthdate}</span>
        )}
        {athlete.Age > 0 && <span>Âge : {athlete.Age}</span>}
      </CardContent>
    </Card>
  );
}
