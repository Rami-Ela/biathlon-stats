import { RankingTable } from "@/components/ranking/rankingTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CupRanking } from "@/types/rankings";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="px-4 flex flex-col items-center gap-10">
        <h1 className="text-2xl font-bold">Classements</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/ranking`}>Classement Femme</Link>
          </Button>
          <Button asChild>
            <Link href={`/ranking/men`}>Classement Homme</Link>
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
                <CardTitle>Classement général Homme</CardTitle>
              </CardHeader>

              <CardContent>
                <RankingTable type="SMTS"></RankingTable>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sprint">
            <Card>
              <CardHeader>
                <CardTitle>Classement sprint Homme</CardTitle>
              </CardHeader>
              <RankingTable type="SMSP"></RankingTable>
            </Card>
          </TabsContent>
          <TabsContent value="pursuit">
            <Card>
              <CardHeader>
                <CardTitle>Classement poursuite Homme</CardTitle>
              </CardHeader>
              <RankingTable type="SMPU"></RankingTable>
            </Card>
          </TabsContent>
          <TabsContent value="individual">
            <Card>
              <CardHeader>
                <CardTitle>Classement individuel Homme</CardTitle>
              </CardHeader>
              <RankingTable type="SMIN"></RankingTable>
            </Card>
          </TabsContent>
          <TabsContent value="mass-start">
            <Card>
              <CardHeader>
                <CardTitle>Classement Mass-Start Homme</CardTitle>
              </CardHeader>
              <RankingTable type="SMMS"></RankingTable>
            </Card>
          </TabsContent>
          <TabsContent value="relay">
            <Card>
              <CardHeader>
                <CardTitle>Classement relai Homme</CardTitle>
              </CardHeader>
              <RankingTable type="SMRL"></RankingTable>
            </Card>
          </TabsContent>
          <TabsContent value="nation">
            <Card>
              <CardHeader>
                <CardTitle>Classement Nation Homme</CardTitle>
              </CardHeader>
              <RankingTable type="SMNC"></RankingTable>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
