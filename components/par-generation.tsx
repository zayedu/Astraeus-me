"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Send, Sparkles, Download, FileSignature, BrainCircuit, X, Eye } from "lucide-react"
import { APIService } from "@/services/api"
import { MessageList } from "./ui/message-list"
import { Header } from "./ui/header"

const apiService = new APIService()

interface PARGenerationProps {
  parId?: string
  onClose: () => void
  onPreviewReady: (url: string) => void
  showAppHeader?: boolean
}

export function PARGeneration({ parId, onClose, onPreviewReady, showAppHeader = false }: PARGenerationProps) {
  const [parContent, setParContent] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFetchingState, setIsFetchingState] = useState(true)
  const [availablePreviewUrl, setAvailablePreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndUpdateParState = async () => {
      if (parId && parId !== "new") {
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

  const handleParChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    const newUserMessage = { text: input, sender: "user" as const }
    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    setIsGenerating(true)

    try {
      const response = await apiService.generateParSection(input, parContent)
      setParContent(response.updatedPar)
      setMessages((prev) => [...prev, { text: response.explanation, sender: "bot" }])
      if (response.draft_par) {
        setAvailablePreviewUrl(response.draft_par)
      }
    } catch (error) {
      console.error("Failed to generate PAR section:", error)
      setMessages((prev) => [...prev, { text: "Sorry, I encountered an error. Please try again.", sender: "bot" }])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExport = () => {
    if (!availablePreviewUrl) return
    const link = document.createElement("a")
    link.href = availablePreviewUrl
    link.download = `par-draft-${parId || "new"}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col h-full bg-black/30 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/40 border border-white/10">
      {showAppHeader ? (
        <Header title="PAR Co-Pilot" showCloseButton onClose={onClose} />
      ) : (
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
      )}

      {isFetchingState ? (
        <div className="flex-1 flex items-center justify-center">
          <BrainCircuit className="w-8 h-8 text-rbc-blue animate-pulse" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          <MessageList messages={messages} />
          <form onSubmit={handleParChatSubmit} className="p-4 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 'Add a risk section for market volatility'"
                className="w-full pl-4 pr-12 py-3 bg-black/30 rounded-lg border border-white/20 focus:ring-2 focus:ring-rbc-yellow/50 focus:outline-none text-white placeholder-blue-200/50"
                disabled={isGenerating || isFetchingState}
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-md text-rbc-yellow disabled:opacity-50 hover:bg-rbc-yellow/10 transition-colors"
                disabled={!input.trim() || isGenerating || isFetchingState}
                aria-label="Send message"
              >
                {isGenerating ? <Sparkles className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </form>
        </div>
      )}

      <footer className="p-4 border-t border-white/10 flex justify-end gap-3 flex-shrink-0">
        <button className="px-4 py-2 text-sm font-semibold bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-blue-100">
          Save Draft
        </button>
        <button
          onClick={() => availablePreviewUrl && onPreviewReady(availablePreviewUrl)}
          disabled={!availablePreviewUrl}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={handleExport}
          disabled={!availablePreviewUrl}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-rbc-yellow text-slate-900 rounded-lg hover:bg-rbc-yellow/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} />
          Export
        </button>
      </footer>
    </div>
  )
}
