export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-md border border-border bg-card/50 p-4">
      <div className="mb-4 h-28 w-2/3 rounded-md bg-muted" />
  
      <div className="mb-2 h-4 w-full rounded-md bg-muted" />


      <div className="h-4 w-5/6 rounded-md bg-muted" />
    </div>
  );
}