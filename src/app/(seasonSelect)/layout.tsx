import SeasonSelect from "@/components/season/seasonSelect";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense>
        <div className="p-3">
          <SeasonSelect />
        </div>
      </Suspense>

      <div>{children}</div>
    </div>
  );
}
