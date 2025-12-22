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
import { format } from "date-fns";
import { Heart, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface InvitationCardProps {
    title: string;
    description: string;
    date: string;
    onAccept: () => void;
    onReject: () => void;
    isCreatorViewing?: boolean;
    onViewSteps: () => void;
}

export function InvitationCard({
    title,
    description,
    date,
    onAccept,
    onReject,
    onViewSteps,
    isCreatorViewing = false,
}: InvitationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <Card className="border-2 border-rose-400/50 shadow-2xl shadow-rose-200/50 bg-white/80 backdrop-blur-md">
                {isCreatorViewing && (
                    <div className="bg-amber-100 border-amber-200 px-4 py-3">
                        <p className="text-center text-amber-800 font-medium text-sm">
                            <strong>Preview Mode</strong> - You&apos;re viewing your own event
                            <Button variant={"ghost"} onClick={onViewSteps}><u>Check out the event steps</u></Button>
                        </p>
                    </div>
                )}
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto bg-rose-100 p-4 rounded-full w-24 h-24 flex items-center justify-center animate-pulse">
                        <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
                    </div>
                    <CardTitle className="text-4xl font-extrabold text-rose-600 drop-shadow-sm">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-xl font-medium text-rose-400">
                        {format(new Date(date), "PPP p")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-slate-600 leading-relaxed italic text-lg opacity-90">
                        &ldquo;{description}&rdquo;
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center pt-6">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto border-rose-200 text-rose-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 transition-colors gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={onReject}
                        disabled={isCreatorViewing}
                    >
                        <XCircle className="w-4 h-4" />
                        No, thanks
                    </Button>
                    <Button
                        size="lg"
                        className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white gap-2 shadow-lg shadow-rose-300/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        onClick={onAccept}
                        disabled={isCreatorViewing}
                    >
                        <Heart className="w-4 h-4 fill-current" />
                        I&apos;d love to!
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
