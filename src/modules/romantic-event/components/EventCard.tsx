"use client";

import { SimpTarget } from "@/types/simpTarget";
import { useDeleteRomanticEvent } from "../hooks/useRomanticEvent";
import { usePublishRomanticEvent } from "@/modules/romantic-event-publish/hooks/useRomanticEventPublish";
import { Button } from "@/components/ui/button";
import { RomanticEvent } from "@/types/event-schema";
import {
  EllipsisVertical,
  Image as ImageIcon,
  Calendar,
  CircleDotDashed,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
type EventCard = {
  event: RomanticEvent;
  onEdit?: (event: RomanticEvent) => void;
};

const eventsEmojis = ["❤️", "🥰", "😍", "🥀", "🌹"];
const eventsBackgrounds = [
  "bg-linear-to-t from-sky-400 to-sky-300",
  "bg-linear-to-t from-violet-400 to-violet-300",
  "bg-linear-to-t from-rose-400 to-rose-300",
  "bg-linear-to-t from-purple-500 to-purple-300",
];


const statusBackgrounds = [
  "bg-green",
  "bg-red",
  "bg-yellow",
  "bg-secondary"
]

function getStatusBackground(status: string) {
  if (status === "accepted") return "bg-green"
  if (status === "published") return "bg-primary"
  if (status === "draft") return "bg-yellow"
  if (status === "rejected") return "bg-red"
  if (status === "confirmed") return "bg-green"
}

function getEmojiAvatar(id: number) {
  const hash = (id * 2654435761) % 3 ** 32;
  return eventsEmojis[hash % eventsEmojis.length];
}
function getBackground(id: number) {
  const hash = (id * 2654435761) % 2 ** 32;
  return eventsBackgrounds[hash % eventsBackgrounds.length];
}

export function EventCard({ event, onEdit }: EventCard) {
  const deleteRomanticEvent = useDeleteRomanticEvent();
  const publishRomanticEvent = usePublishRomanticEvent();
  const [publishedToken, setPublishedToken] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handlePublish = () => {
    if (!event.id) return;
    publishRomanticEvent.mutate(event.id, {
      onSuccess: (data: any) => {
        if (data.token) {
          setPublishedToken(data.token);
          setIsSuccessOpen(true);
        }
      },
    });
  };
  return (
    <>
      <div className="rounded-xl border border-border flex flex-col bg-card hover:border-foreground/15 gap-5 p-3 max-h-70 ">
        <div className="rounded-lg flex justify-between ">
          <div className="flex items-center gap-2">
            <div
              className={`text-6xl shadow-md border-4 border-border p-4 rounded-full ${getBackground(
                event.id ?? 0
              )}`}
            >
              {getEmojiAvatar(event.id ?? 0)}
            </div>
            <div className="flex flex-col gap-1  ">
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className="text-sm text-muted-foreground max-h-16">
                {event.description}
              </p>
            </div>
          </div>

          <div className="flex justify-center relative gap-3 rounded-t-xl h-12 items-center">
            <div className="absolute right-1 ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2  cursor-pointer rounded-xl">
                    <EllipsisVertical />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {onEdit && (
                    <DropdownMenuItem
                      onClick={() => {
                        onEdit(event);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled={deleteRomanticEvent.isPending}
                    onClick={() => {
                      if (event.id !== undefined) {
                        deleteRomanticEvent.mutate(event.id);
                      } else {
                        console.warn("Event id is missing");
                      }
                    }}
                    className="text-red-600 focus:bg-red-100"
                  >
                    {deleteRomanticEvent.isPending ? "Deleting..." : "Delete"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Calendar className="w-[1.2rem] h-[1.2rem]" />
              <p>Date</p>
            </div>
            <p>{event.event_date.slice(0, 10)}</p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <CircleDotDashed className="w-[1.2rem] h-[1.2rem]" />
              <p>Status</p>
            </div>
            <p
              className={`py-1 px-5 ${getStatusBackground(event.status)
                } text-white w-fit rounded-lg`}
            >
              {event.status}
            </p>
          </div>
        </div>
        <div className="flex w-full">
          {event.status === "draft" ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full">Publish</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently publish your
                    romantic event.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handlePublish}>
                    Publish
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button variant="outline" disabled className="w-full">
              Published
            </Button>
          )}
        </div>
      </div >
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Published Successfully!</DialogTitle>
            <DialogDescription>
              Your romantic event has been published. Share this link with your
              partner!
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value={`${window.location.origin}/public/romantic-event/${publishedToken}`}
            />
            <Button
              size="sm"
              className="px-3"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/public/romantic-event/${publishedToken}`
                );
              }}
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="px-3"
              onClick={() => {
                window.open(
                  `${window.location.origin}/public/romantic-event/${publishedToken}`,
                  "_blank"
                );
              }}
            >
              <span className="sr-only">Open</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
