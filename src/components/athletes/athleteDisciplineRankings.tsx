import { AthleteSeasonRankings } from "@/types/athletes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AthleteDisciplineRankingsProps {
  rankings: AthleteSeasonRankings;
}

export function AthleteDisciplineRankings({
  rankings,
}: AthleteDisciplineRankingsProps) {
  if (rankings.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        Aucun classement individuel cette saison
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {rankings.map((discipline) => {
        return (
          <Card key={discipline.type}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{discipline.cupName}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm flex flex-col gap-1">
              <span className="text-2xl font-bold">#{discipline.row.Rank}</span>
              <span className="text-muted-foreground">
                {discipline.row.Score} pts
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
