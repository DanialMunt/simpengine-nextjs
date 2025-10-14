import React from "react";
import { Button } from "@/components/ui/button";
import { HandHeart } from "lucide-react";
export default function SimpTargetMiniCard({ target }: { target: any }) {
  const avatarEmojis = ["👩🏽‍🔧", "👩🏿‍🎓", "👰🏼‍♀️", "👩🏼‍⚕️", "🧕🏽", "👩🏽‍🍳"];
  function getEmojiAvatar(id: number) {
    const hash = (id * 2654435761) % 3 ** 32;
    return avatarEmojis[hash % avatarEmojis.length];
  }
  return (
    <div className="p-4 mb-3 flex justify-between bg-card border b rounded-lg hover:bg-accent transition cursor-pointer">
      <div className="flex gap-3">
        <div className="text-4xl">{getEmojiAvatar(target.id)}</div>
        <div className="flex flex-col">
          <h2 className="text-base font-bold mb-1">{target.name}</h2>
          <p className="text-muted-foreground text-xs">{target.description}</p>
        </div>
      </div>
      <div className="flex">
        <Button>
          <HandHeart />
        </Button>
      </div>
    </div>
  );
}
