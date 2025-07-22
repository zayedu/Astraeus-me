"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Send, Sparkles, Download, FileSignature, BrainCircuit, X } from "lucide-react"
import { APIService } from "@/services/api"
import { cn } from "@/lib/utils"
import { renderMarkdown } from "@/lib/markdown"
import { MessageList } from "./ui/message-list"

const apiService = new APIService()

interface PARGenerationProps {
  parId?: string
  onClose: () => void
}

export function PARGeneration({ parId, onClose }: PARGenerationProps) {
  const [parContent, setParContent] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFetchingState, setIsFetchingState] = useState(true)
  const [glow, setGlow] = useState(false)

  useEffect(() => {
    const fetchAndUpdateParState = async () => {
      if (parId) {
        setIsFetchingState(true)
        try {
          const state = await apiService.getParState(parId)
          setParContent(state.content)
          setMessages(state.chatHistory)
        } catch (error) {
          console.error("Failed to fetch PAR state:", error)
          setMessages([
            { sender: "bot", text: "Apologies, I was unable to load the document state. You can start fresh." },
          ])
        } finally {
          setIsFetchingState(false)
        }
      } else {
        setIsFetchingState(false)
        setMessages([{ sender: "bot", text: "Welcome to the PAR Co-Pilot. How can I help you build this document?" }])
      }
    }
    fetchAndUpdateParState()
  }, [parId])

  useEffect(() => {
    if (parContent && !isFetchingState) {
      setGlow(true)
      const timer = setTimeout(() => setGlow(false), 1200)
      return () => clearTimeout(timer)
    }
  }, [parContent, isFetchingState])

  const handleParChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    const newUserMessage = { text: input, sender: "user" as const }
    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    setIsGenerating(true)

    const response = await apiService.generateParSection(input, parContent)
    setParContent(response.updatedPar)
    setMessages((prev) => [...prev, { text: response.explanation, sender: "bot" }])
    setIsGenerating(false)
  }

  return (
    <div className="flex flex-col h-full bg-black/30 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/40 border border-white/10">
      <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <FileSignature className="w-6 h-6 text-rbc-yellow" />
          <h2 className="text-lg font-semibold text-white">PAR Co-Pilot</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-blue-200/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: The Co-pilot Chat */}
        <div className="w-1/2 h-full flex flex-col border-r border-white/10">
          <MessageList messages={messages} />
          <form onSubmit={handleParChatSubmit} className="p-4 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 'Add a risk section'"
                className="w-full pl-4 pr-12 py-2 bg-black/30 rounded-lg border border-white/20 focus:ring-2 focus:ring-rbc-yellow/50 focus:outline-none"
                disabled={isGenerating || isFetchingState}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-rbc-yellow disabled:opacity-50"
                disabled={!input.trim() || isGenerating || isFetchingState}
              >
                {isGenerating ? <Sparkles className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </form>
        </div>

        {/* Right Pane: The PAR Document Preview */}
        <div
          className={cn(
            "w-1/2 h-full overflow-y-auto p-6 transition-all duration-700",
            glow ? "shadow-glow-yellow" : "",
          )}
        >
          {isFetchingState ? (
            <div className="flex items-center justify-center h-full">
              <BrainCircuit className="w-8 h-8 text-rbc-blue animate-pulse" />
            </div>
          ) : (
            <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: renderMarkdown(parContent) }} />
          )}
        </div>
      </div>

      <footer className="p-4 border-t border-white/10 flex justify-end gap-3 flex-shrink-0">
        <button className="px-4 py-2 text-sm font-semibold bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          Save Draft
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-rbc-yellow text-slate-900 rounded-lg hover:bg-rbc-yellow/80 transition-colors">
          <Download size={16} />
          Export
        </button>
      </footer>
    </div>
  )
}
