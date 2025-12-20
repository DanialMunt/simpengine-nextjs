"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export interface PublicOption {
    id: number;
    label: string;
    img_id?: number;
}

interface StepCardProps {
    title: string;
    description: string;
    options: PublicOption[];
    onNext: (selectedOptionIds: number[]) => void;
    isLastStep?: boolean;
}

export function StepCard({
    title,
    description,
    options,
    onNext,
    isLastStep = false,
}: StepCardProps) {
    // Assuming single selection for now based on typical flows, 
    // but keeping it as an array state to support multi-select if needed later.
    // For 'selecting options', usually it's one choice per step or multiple.
    // I will implement single select logic for UI clarity but store as array.
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelection = (id: number) => {
        // Multi select mode:
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((i) => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
        >
            <Card className="border-border/50 shadow-xl bg-card/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                    <CardDescription className="text-lg">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {options.map((option) => {
                            const isSelected = selectedIds.includes(option.id);
                            return (
                                <div
                                    key={option.id}
                                    onClick={() => toggleSelection(option.id)}
                                    className={cn(
                                        "cursor-pointer relative group rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md",
                                        isSelected
                                            ? "border-primary bg-primary/5 shadow-primary/20"
                                            : "border-muted hover:border-primary/50 bg-secondary/30"
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={cn(
                                                "font-semibold text-lg",
                                                isSelected ? "text-primary" : "text-foreground"
                                            )}
                                        >
                                            {option.label}
                                        </span>
                                        {isSelected && (
                                            <div className="bg-primary text-primary-foreground rounded-full p-1">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Image display */}
                                    {option.img_id && (
                                        <div className="mt-3 aspect-video w-full rounded-lg overflow-hidden bg-muted/50">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/media/${option.img_id}`}
                                                alt={option.label}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-4">
                    <Button
                        size="lg"
                        disabled={selectedIds.length === 0}
                        onClick={() => onNext(selectedIds)}
                        className="gap-2 bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/20"
                    >
                        {isLastStep ? "Finish" : "Next Step"}
                        {!isLastStep && <ChevronRight className="w-4 h-4" />}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
