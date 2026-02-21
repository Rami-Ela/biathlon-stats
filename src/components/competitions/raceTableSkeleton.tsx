export function RaceTableSkeleton() {
  return (
    <div className="w-full max-w-4xl animate-pulse">
      {/* header row */}
      <div className="flex gap-4 px-4 py-3 border-b">
        {[40, 160, 100, 80, 80].map((w, i) => (
          <div key={i} className="h-4 rounded bg-muted" style={{ width: w }} />
        ))}
      </div>
      {/* data rows */}
      {Array.from({ length: 15 }).map((_, row) => (
        <div key={row} className="flex gap-4 px-4 py-3 border-b">
          {[40, 160, 100, 80, 80].map((w, i) => (
            <div key={i} className="h-4 rounded bg-muted" style={{ width: w }} />
          ))}
        </div>
      ))}
    </div>
  );
}
