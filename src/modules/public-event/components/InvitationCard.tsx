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
}

export function InvitationCard({
    title,
    description,
    date,
    onAccept,
    onReject,
}: InvitationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <Card className="border-2 border-primary/20 shadow-xl bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center">
                        <Heart className="w-10 h-10 text-primary animate-pulse" fill="currentColor" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-primary bg-clip-text text-transparent">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium">
                        {format(new Date(date), "PPP p")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground leading-relaxed italic">
                        &ldquo;{description}&rdquo;
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center pt-6">
                    <Button
                        variant="outline"
                        className="w-full text-red sm:w-auto border-destructive/50 hover:bg-destructive/10 hover:text-destructive transition-colors gap-2"
                        onClick={onReject}
                    >
                        <XCircle className="w-4 h-4" />
                        No, thanks
                    </Button>
                    <Button
                        size="lg"
                        className="w-full sm:w-auto  from-primary  gap-2 shadow-lg shadow-primary/25"
                        onClick={onAccept}
                    >
                        <Heart className="w-4 h-4" fill="currentColor" />
                        I&apos;d love to!
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
