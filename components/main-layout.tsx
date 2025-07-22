"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { AstraeusChat } from "./astraeus-chat"
import { PARGeneration } from "./par-generation"
import type { AppMode } from "@/lib/types"

export function MainLayout() {
  const [mode, setMode] = useState<AppMode>("default")

  return (
    <div className="relative h-screen w-full p-4">
      <div
        className={cn(
          "absolute inset-4 transition-all duration-700 ease-in-out",
          mode === "default" ? "w-[calc(100%-2rem)]" : "w-[calc(33.33%-1.5rem)]",
        )}
      >
        <AstraeusChat parGenerationActive={mode === "par_generation"} onParTrigger={() => setMode("par_generation")} />
      </div>

      <div
        className={cn(
          "absolute top-4 right-4 h-[calc(100%-2rem)] w-[calc(66.67%-1.5rem)] transition-transform duration-700 ease-in-out",
          mode === "par_generation" ? "translate-x-0" : "translate-x-[105%]",
        )}
      >
        <PARGeneration onClose={() => setMode("default")} />
      </div>
    </div>
  )
}
