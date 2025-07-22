"use client"

import { BrainCircuit, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { renderMarkdown } from "@/lib/markdown"

interface Message {
  text: string
  sender: "user" | "bot"
}

interface MessageItemProps {
  message: Message
  index: number
}

export function MessageItem({ message, index }: MessageItemProps) {
  const isUser = message.sender === "user"

  return (
    <div
      className={cn("flex animate-fade-in items-start gap-4 group", isUser ? "justify-end" : "justify-start")}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {!isUser && (
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-br from-rbc-blue to-rbc-yellow rounded-lg blur opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="relative w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center border border-white/20">
            <BrainCircuit size={16} className="text-rbc-yellow" />
          </div>
        </div>
      )}
      <div
        className={cn(
          "max-w-md px-5 py-3 rounded-xl shadow-lg border transition-all duration-300 group-hover:scale-[1.02]",
          isUser
            ? "bg-rbc-blue/80 border-rbc-blue/50 text-white group-hover:bg-rbc-blue/90"
            : "bg-black/20 border-white/10 text-blue-100/90 group-hover:border-white/20",
        )}
      >
        <div
          className="prose prose-sm prose-invert prose-p:my-0"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(message.text) }}
        />
      </div>
      {isUser && (
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center border border-white/20">
            <User size={16} className="text-blue-200" />
          </div>
        </div>
      )}
    </div>
  )
}
