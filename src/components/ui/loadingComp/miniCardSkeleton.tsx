export default function MiniCardSkeleton() {

  return (
    <div className="p-4 mb-3 flex animate-pulse justify-between bg-card/50 border b rounded-lg">
      <div className="flex w-full gap-3">
        <div className="p-3 rounded-full max-h-16 max-w-16 min-h-16 min-w-16 bg-muted-foreground/10" />
        <div className="flex flex-col w-full gap-3">
          <div className=" p-3 h-4 w-2/3 rounded-md bg-muted-foreground/10" />
          <div className="p-3 h-4 w-full rounded-md bg-muted-foreground/10" />
        </div>
      </div>
    </div>
  );
}
