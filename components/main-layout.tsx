"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AstraeusChat } from "@/components/astraeus-chat"
import { PARGeneration } from "@/components/par-generation"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { X } from "lucide-react"

interface MainLayoutProps {
  parId?: string
}

export function MainLayout({ parId }: MainLayoutProps) {
  const router = useRouter()
  const [mode, setMode] = useState<"default" | "par_generation">("default")
  const [parGenerationActive, setParGenerationActive] = useState(false)
  const [isLhsCollapsed, setIsLhsCollapsed] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (parId) {
      setMode("par_generation")
      setParGenerationActive(true)
    } else {
      setMode("default")
      setParGenerationActive(false)
    }
  }, [parId])

  const handleParTrigger = () => {
    router.push("/dashboard/par/new/edit")
  }

  const handleParClose = () => {
    setPreviewUrl(null)
    router.push("/dashboard/chat")
  }

  const handlePreviewReady = (url: string) => {
    setPreviewUrl(url)
  }

  const handleClosePreview = () => {
    setPreviewUrl(null)
  }

  const defaultLhsSize = previewUrl ? 25 : 40
  const defaultParGenSize = previewUrl ? 45 : 60
  const defaultPreviewSize = 30

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-blue-50 p-4">
      {mode === "default" ? (
        <div className="h-full">
          <AstraeusChat parGenerationActive={parGenerationActive} onParTrigger={handleParTrigger} />
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel
            defaultSize={defaultLhsSize}
            minSize={15}
            collapsible={true}
            collapsedSize={4}
            onCollapse={() => setIsLhsCollapsed(true)}
            onExpand={() => setIsLhsCollapsed(false)}
            className="transition-all duration-300"
          >
            <AstraeusChat
              isCollapsed={isLhsCollapsed}
              parGenerationActive={parGenerationActive}
              onParTrigger={handleParTrigger}
            />
          </ResizablePanel>
          <ResizableHandle
            withHandle
            className="bg-transparent hover:bg-rbc-blue/20 transition-colors duration-200 data-[resize-handle-state=drag]:bg-rbc-blue/30"
          />
          <ResizablePanel defaultSize={defaultParGenSize} minSize={30}>
            <PARGeneration
              parId={parId}
              onClose={handleParClose}
              onPreviewReady={handlePreviewReady}
              showAppHeader={isLhsCollapsed}
            />
          </ResizablePanel>
          {previewUrl && (
            <>
              <ResizableHandle
                withHandle
                className="bg-transparent hover:bg-rbc-blue/20 transition-colors duration-200 data-[resize-handle-state=drag]:bg-rbc-blue/30"
              />
              <ResizablePanel defaultSize={defaultPreviewSize} minSize={20}>
                <div className="flex flex-col h-full bg-black/30 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/40 border border-white/10">
                  <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-white">Document Preview</h2>
                    <button
                      onClick={handleClosePreview}
                      className="p-2 rounded-full text-blue-200/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </header>
                  <div className="flex-1 bg-slate-800 rounded-b-2xl">
                    <iframe src={previewUrl} className="w-full h-full border-0" title="PAR Document Preview" />
                  </div>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      )}
    </div>
  )
}
