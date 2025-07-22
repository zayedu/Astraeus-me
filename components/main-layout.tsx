"use client"

import { AstraeusChat } from "@/components/astraeus-chat"
import { PARGeneration } from "@/components/par-generation"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { useNavigate } from "react-router-dom"

interface MainLayoutProps {
  parId?: string
}

export function MainLayout({ parId }: MainLayoutProps) {
  const navigate = useNavigate()
  const isParMode = !!parId

  const handleParTrigger = () => {
    // Navigate to a new PAR creation page
    navigate("/dashboard/par/new/edit")
  }

  const handleParClose = () => {
    // Navigate back to the main dashboard view
    navigate("/dashboard")
  }

  return (
    <div className="h-full p-4">
      {!isParMode ? (
        <div className="h-full">
          <AstraeusChat parGenerationActive={false} onParTrigger={handleParTrigger} />
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel defaultSize={40} minSize={20}>
            {/* The chat panel in PAR mode should not be able to trigger a new PAR */}
            <AstraeusChat parGenerationActive={true} onParTrigger={() => {}} />
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
