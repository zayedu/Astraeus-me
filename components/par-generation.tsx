"use client"

import { useState, useEffect, useRef } from "react"
import { FileDown, FileText, Presentation } from "lucide-react"
import MarkdownIt from "markdown-it"
import { APIService } from "@/services/api"
import { MessageList } from "./ui/message-list"
import { InputArea } from "./ui/input-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Message } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Header } from "./ui/header"
import type { PARGenerationProps } from "@/lib/types" // Declare the variable here

const apiService = new APIService()
const md = new MarkdownIt({ html: true, linkify: true, breaks: true }).use(require("markdown-it-attrs"))

export function PARGeneration({ onClose }: PARGenerationProps) {
  const [parContent, setParContent] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initializePar = async () => {
      setIsTyping(true)
      const initialResponse = await apiService.generatePar()
      if (initialResponse) {
        setMessages([{ id: "init", text: initialResponse.chatResponse, sender: "bot" }])
        setParContent(initialResponse.parUpdate)
      }
      setIsTyping(false)
    }
    initializePar()
  }, [])

  useEffect(() => {
    if (isUpdating) {
      const timer = setTimeout(() => setIsUpdating(false), 1200)
      return () => clearTimeout(timer)
    }
  }, [isUpdating])

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight
    }
  }, [parContent])

  const handleNewMessage = async (query: string) => {
    const userMessage: Message = { id: Date.now().toString(), text: query, sender: "user" }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    setIsUpdating(true)

    const response = await apiService.queryParBuilder(query, parContent)

    if (response) {
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: response.chatResponse, sender: "bot" }
      setMessages((prev) => [...prev, botMessage])
      setParContent((prev) => prev.replace(/\[.*?\]/, "") + response.parUpdate)
    }
    setIsTyping(false)
  }

  return (
    <div className="flex flex-col h-full bg-black/20 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/30 border border-white/10">
      <Header title="PAR Co-Pilot" showCloseButton onClose={onClose} />
      <div className="flex-1 grid grid-cols-2 gap-4 p-4 pt-0 min-h-0">
        {/* Chat Panel */}
        <div className="flex flex-col bg-black/20 border border-white/10 rounded-xl shadow-lg">
          <MessageList messages={messages} />
          {isTyping && (
            <div className="px-6 pb-2 text-xs text-blue-200/70 animate-pulse">Co-pilot is processing...</div>
          )}
          <InputArea disabled={isTyping} onSubmit={handleNewMessage} placeholder="Provide details for the PAR..." />
        </div>

        {/* PAR Preview Panel */}
        <div
          className={cn(
            "flex flex-col bg-black/20 border border-white/10 rounded-xl shadow-lg transition-all duration-700",
            isUpdating && "shadow-glow-blue border-rbc-blue/50",
          )}
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
            <h3 className="font-medium text-blue-100/90 flex items-center gap-2">
              <FileText size={16} className="text-rbc-yellow" />
              Live PAR Preview
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-rbc-blue text-white rounded-lg hover:bg-rbc-blue/80 transition-all duration-300 shadow-lg hover:shadow-glow-blue transform hover:-translate-y-0.5 text-sm font-semibold">
                  <FileDown size={16} />
                  Export
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-slate-800/80 backdrop-blur-lg border-white/20 rounded-lg shadow-xl text-blue-50"
              >
                <DropdownMenuItem className="cursor-pointer focus:bg-rbc-blue/50">
                  <FileText className="mr-2 h-4 w-4 text-rbc-yellow" />
                  <span>Export as PDF</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-rbc-blue/50">
                  <Presentation className="mr-2 h-4 w-4 text-rbc-yellow" />
                  <span>Export as PPT</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div ref={previewRef} className="flex-1 p-6 overflow-y-auto prose prose-sm prose-invert">
            {isTyping && messages.length <= 1 ? (
              <div className="flex flex-col items-center justify-center h-full text-blue-200/70">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rbc-yellow"></div>
                <span className="mt-4 text-sm font-medium">Waiting for initial input...</span>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: md.render(parContent) }} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
