"use client"

import { useState } from "react"
import { AstraeusChat } from "@/components/astraeus-chat"
import { PARGeneration } from "@/components/par-generation"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

interface MainLayoutProps {
  parId?: string
}

export function MainLayout({ parId }: MainLayoutProps) {
  const [mode, setMode] = useState<"default" | "par_generation">(parId ? "par_generation" : "default")
  // This state is to prevent re-triggering PAR generation while one is active.
  const [parGenerationActive, setParGenerationActive] = useState(!!parId)

  const handleParTrigger = () => {
    setMode("par_generation")
    setParGenerationActive(true)
  }

  const handleParClose = () => {
    setMode("default")
    setParGenerationActive(false) // Allow re-triggering
  }

  return (
    <div className="h-full p-4">
      {mode === "default" ? (
        <div className="h-full">
          <AstraeusChat parGenerationActive={parGenerationActive} onParTrigger={handleParTrigger} />
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel defaultSize={40} minSize={20}>
            <AstraeusChat parGenerationActive={parGenerationActive} onParTrigger={handleParTrigger} />
          </ResizablePanel>
          <ResizableHandle
            withHandle
            className="bg-transparent hover:bg-rbc-blue/20 transition-colors duration-200 data-[resize-handle-state=drag]:bg-rbc-blue/30"
          />
          <ResizablePanel defaultSize={60} minSize={30}>
            <PARGeneration parId={parId} onClose={handleParClose} />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  )
}
