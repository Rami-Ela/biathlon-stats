import { RankingTable } from "@/components/ranking/rankingTable";
import { LinkWithSeason } from "@/components/season/linkWithSeason";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_SEASON, SeasonIds } from "@/types/competitions";

interface Props {
  searchParams: Promise<{ seasonId: string }>;
}

export default async function Home({ searchParams }: Props) {
  const seasonId = (await searchParams).seasonId ?? DEFAULT_SEASON;

  return (
    <>
      <div className="px-4 flex flex-col items-center gap-10">
        <h1 className="text-2xl font-bold">Classements</h1>
        <div className="flex gap-2">
          <Button asChild>
            <LinkWithSeason href={`/ranking`} seasonId={seasonId}>
              Classement Femme
            </LinkWithSeason>
          </Button>
          <Button asChild variant="outline">
            <LinkWithSeason href={`/ranking/men`} seasonId={seasonId}>
              Classement Homme
            </LinkWithSeason>
          </Button>
        </div>

        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-1 h-auto md:grid-cols-7">
            <TabsTrigger value="global">Général</TabsTrigger>
            <TabsTrigger value="sprint">Sprint</TabsTrigger>
            <TabsTrigger value="pursuit">Poursuite</TabsTrigger>
            <TabsTrigger value="individual">Individuel</TabsTrigger>
            <TabsTrigger value="mass-start">Mass Start</TabsTrigger>
            <TabsTrigger value="relay">Relai</TabsTrigger>
            <TabsTrigger value="nation">Nation</TabsTrigger>
          </TabsList>
          <TabsContent value="global">
            <Card>
              <CardHeader>
                <CardTitle>Classement général Femme</CardTitle>
              </CardHeader>

              <CardContent>
                <RankingTable seasonId={seasonId} type="SWTS"></RankingTable>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sprint">
            <Card>
              <CardHeader>
                <CardTitle>Classement sprint Femme</CardTitle>
              </CardHeader>
              <RankingTable seasonId={seasonId} type="SWSP"></RankingTable>
            </Card>
          </TabsContent>
          <TabsContent value="pursuit">
            <Card>
              <CardHeader>
                <CardTitle>Classement poursuite Femme</CardTitle>
              </CardHeader>
              <RankingTable seasonId={seasonId} type="SWPU"></RankingTable>
            </Card>
          </TabsContent>
          <TabsContent value="individual">
            <Card>
              <CardHeader>
                <CardTitle>Classement individuel Femme</CardTitle>
              </CardHeader>
              <RankingTable seasonId={seasonId} type="SWIN"></RankingTable>
            </Card>
          </TabsContent>
          <TabsContent value="mass-start">
            <Card>
              <CardHeader>
                <CardTitle>Classement Mass-Start Femme</CardTitle>
              </CardHeader>
              <RankingTable seasonId={seasonId} type="SWMS"></RankingTable>
            </Card>
          </TabsContent>
          <TabsContent value="relay">
            <Card>
              <CardHeader>
                <CardTitle>Classement relai Femme</CardTitle>
              </CardHeader>
              <RankingTable seasonId={seasonId} type="SWRL"></RankingTable>
            </Card>
          </TabsContent>
          <TabsContent value="nation">
            <Card>
              <CardHeader>
                <CardTitle>Classement nation Femme</CardTitle>
              </CardHeader>
              <RankingTable seasonId={seasonId} type="SWNC"></RankingTable>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
