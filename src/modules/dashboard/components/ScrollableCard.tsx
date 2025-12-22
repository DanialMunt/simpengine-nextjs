import Link from "next/link";
import { ReactNode } from "react";

interface ScrollableCardProps {
    title: string;
    viewAllHref: string;
    isLoading: boolean;
    children: ReactNode;
    emptyMessage?: string;
}

export function ScrollableCard({
    title,
    viewAllHref,
    isLoading,
    children,
    emptyMessage = "No items found",
}: ScrollableCardProps) {
    return (
        <div className="w-full h-full bg-card rounded-lg border border-border flex flex-col overflow-hidden">
            <div className="flex-shrink-0 pt-3 pb-2 px-3 flex justify-between items-center bg-card">
                <p className="font-medium">{title}</p>
                <Link href={viewAllHref}>
                    <span className="text-primary text-sm hover:underline">View all</span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto px-3">
                {children ? (
                    children
                ) : (
                    <p className="text-muted-foreground p-10 text-center">
                        {emptyMessage}
                    </p>
                )}
            </div>
        </div>
    );
}
