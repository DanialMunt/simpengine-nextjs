// components/ui/calendar-skeleton.tsx
"use client";

export function CalendarLoader() {
  return (
    <div className="flex flex-col h-full w-full rounded-lg gap-4 animate-pulse">
    
        <div className="grid bg-card/50 border border-border px-3 py-5 rounded-lg grid-cols-8 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-4 bg-muted-foreground/10 rounded" />
          ))}
        </div>


      <div className="flex-1 grid grid-cols-6  grid-rows-5 gap-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col border border-border rounded-md p-2 gap-2 bg-card/50"
          >
          
            <div className="h-3 w-4 bg-muted-foreground/10 rounded" />


            <div className="flex flex-col gap-1">
              <div className="h-3 w-3/4 bg-muted-foreground/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
