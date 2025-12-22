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
import { toast } from "sonner";

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
    isCreatorViewing?: boolean;
}

export function StepCard({
    title,
    description,
    options,
    onNext,
    isCreatorViewing = false,
    isLastStep = false,
}: StepCardProps) {

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelection = (id: number) => {

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
            <Card className="border-2 border-rose-300/50 shadow-2xl shadow-rose-200/50 bg-white/90 backdrop-blur-md">
                <CardHeader>

                    <CardTitle className="text-3xl font-bold text-rose-600 drop-shadow-sm">{title}</CardTitle>
                    {isCreatorViewing && (
                        <div className="bg-amber-100 border-amber-200 px-4 py-3">
                            <p className="text-center text-amber-800 font-medium text-sm">
                                <strong>Preview Mode</strong> - You&apos;re viewing your own event
                            </p>
                        </div>
                    )}
                    {/* <CardDescription className="text-lg">{description}</CardDescription> */}

                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {options.map((option) => {
                            const isSelected = selectedIds.includes(option.id);
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        if (!isCreatorViewing) {
                                            toggleSelection(option.id)
                                        } else {
                                            toast.info("You can't select options in creator view")
                                        }
                                    }}
                                    // disabled={isCreatorViewing}
                                    className={cn(
                                        "cursor-pointer relative group rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                                        isSelected
                                            ? "border-rose-500 bg-rose-50 shadow-rose-200"
                                            : "border-rose-100 hover:border-rose-300 bg-white"
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={cn(
                                                "font-semibold text-lg",
                                                isSelected ? "text-rose-600" : "text-slate-700"
                                            )}
                                        >
                                            {option.label}
                                        </span>
                                        {isSelected && (
                                            <div className="bg-rose-500 text-white rounded-full p-1 animate-in zoom-in-50 duration-200">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Image display */}
                                    {option.img_id && (
                                        <div className="mt-3 aspect-video w-full rounded-lg overflow-hidden bg-rose-100/50">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/media/${option.img_id}`}
                                                alt={option.label}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-6 border-t border-rose-100">
                    <Button
                        size="lg"
                        disabled={!isCreatorViewing && selectedIds.length === 0}
                        onClick={() => onNext(selectedIds)}
                        className="gap-2 shadow-lg shadow-rose-300/50 bg-rose-500 hover:bg-rose-600 text-white transition-all hover:scale-105"
                    >
                        {isLastStep ? "Finish" : "Next Step"}
                        {!isLastStep && <ChevronRight className="w-4 h-4" />}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
