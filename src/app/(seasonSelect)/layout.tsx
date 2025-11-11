import SeasonSelect from "@/components/season/seasonSelect";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-2">
      <Suspense>
        <SeasonSelect />
      </Suspense>

      <div>{children}</div>
    </div>
  );
}
