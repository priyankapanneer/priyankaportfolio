"use client";

import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ level, className }: { level: string; className?: string }) {
    // Map level to star count
    let count = 0;
    if (level === "Expert") count = 5;
    if (level === "Advanced") count = 4;
    if (level === "Intermediate") count = 3;
    if (level === "Beginner") count = 2;

    return (
        <div className={cn("flex gap-0.5", className)}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={14}
                    className={cn(
                        "transition-all duration-300",
                        i <= count ? "fill-current text-current scale-110" : "text-muted-foreground/30 fill-muted-foreground/10"
                    )}
                />
            ))}
        </div>
    );
}
