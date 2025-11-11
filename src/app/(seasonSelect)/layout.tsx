import SeasonSelect from "@/components/season/seasonSelect";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-2">
      <SeasonSelect />
      <div>{children}</div>
    </div>
  );
}
