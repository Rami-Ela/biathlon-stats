import { RaceViewTabs } from "@/components/competitions/raceViewTabs";
import { RaceDetail } from "@/types/competitions";
import { Suspense } from "react";
import { fetchJson } from "@/lib/api/fetchJson";

interface RaceLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function RaceLayout({ children, params }: RaceLayoutProps) {
  const { id } = await params;

  const race = await fetchJson<RaceDetail>(
    `${process.env.DOMAIN_URL}/api/competitions/${id}`,
    { cache: "no-store" },
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold">{race?.Competition?.ShortDescription}</h1>
      <h2 className="font-semibold">{race?.SportEvt?.ShortDescription}</h2>
      <Suspense>
        <RaceViewTabs raceId={id} />
      </Suspense>
      {children}
    </div>
  );
}
