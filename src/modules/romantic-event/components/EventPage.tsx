"use client";
import { useState } from "react";
import { EventCard } from "./EventCard";
import { motion, AnimatePresence } from "framer-motion";
import { CardSkeleton } from "@/components/ui/loadingComp/cardSkeleton";
import { useGetRomanticEvent } from "@/modules/romantic-event/hooks/useRomanticEvent";
export default function EventsPage() {
  const { data: events, isLoading } = useGetRomanticEvent();
  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key="events"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
