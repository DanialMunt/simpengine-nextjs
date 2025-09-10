"use client"

import Image from "next/image";

import { Button } from "@/components/ui/button/button";

export default function Home() {
  return (
    <div className="flex">
      <Button>Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline" >Small</Button>
      <Button isLoading>Saving...</Button>
      <Button>Add</Button>
    </div>
  );
}
