import React from "react";

export default function SimpTargetMiniCard({ target }: { target: any }) {
  const avatarEmojis = ["👩🏽‍🔧", "👩🏿‍🎓", "👰🏼‍♀️", "👩🏼‍⚕️", "🧕🏽", "👩🏽‍🍳"];
  function getEmojiAvatar(id: number) {
    const hash = (id * 2654435761) % 3 ** 32;
    return avatarEmojis[hash % avatarEmojis.length];
  }
  return (
    <div className="p-4 mb-4 flex gap-3 bg-background border b rounded-lg hover:bg-accent transition cursor-pointer">
      <div className="text-4xl ">
        {getEmojiAvatar(target.id)}
      </div>
      <div className="flex flex-col">
        <h2 className="text-base font-bold mb-1">{target.name}</h2>
        <p className="text-gray-700 text-xs">{target.description}</p>
      </div>
    </div>
  );
}
