"use client"

import { useState } from "react"
import { Header } from "./ui/header"
import { MessageList } from "./ui/message-list"
import { InputArea } from "./ui/input-area"
import { WelcomeScreen } from "./ui/welcome-screen"
import { APIService } from "@/services/api"
import type { Message } from "@/lib/types"

const apiService = new APIService()

interface AstraeusChatProps {
  parGenerationActive: boolean
  onParTrigger: () => void
}

export function AstraeusChat({ parGenerationActive, onParTrigger }: AstraeusChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const handleNewMessage = async (query: string) => {
    if (
      parGenerationActive &&
      (query.toLowerCase().includes("generate par") || query.toLowerCase().includes("project approval"))
    ) {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: "A PAR generation session is already active. Please close the current session on the right to start a new one.",
        sender: "bot",
      }
      setMessages((prev) => [...prev, botMessage])
      return
    }

    const userMessage: Message = { id: Date.now().toString(), text: query, sender: "user" }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    const response = await apiService.queryInsights(query)
    setIsTyping(false)

    if (response.content?.classification === "par_generation") {
      onParTrigger()
    } else {
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: response.content, sender: "bot" }
      setMessages((prev) => [...prev, botMessage])
    }
  }

  return (
    <div className="flex flex-col h-full bg-black/20 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/30 border border-white/10">
      <Header title="Insights Co-Pilot" />
      {messages.length === 0 ? (
        <WelcomeScreen onSuggestionClick={handleNewMessage} />
      ) : (
        <MessageList messages={messages} />
      )}
      {isTyping && <div className="px-6 pb-2 text-xs text-blue-200/70 animate-pulse">Astraeus is processing...</div>}
      <InputArea disabled={isTyping} onSubmit={handleNewMessage} placeholder="Ask about financial data..." />
    </div>
  )
}
