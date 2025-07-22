import { cn } from "@/lib/utils"
import type { Message } from "@/lib/types"
import { Sparkles } from "lucide-react"

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((msg) => (
        <div key={msg.id} className={cn("flex items-start gap-4", msg.sender === "user" && "justify-end")}>
          {msg.sender === "bot" && (
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-rbc-blue to-rbc-yellow rounded-lg blur opacity-50"></div>
              <div className="relative w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center border border-white/20">
                <Sparkles size={16} className="text-rbc-yellow" />
              </div>
            </div>
          )}
          <div
            className={cn(
              "max-w-2xl px-5 py-3 rounded-xl shadow-lg border",
              msg.sender === "bot"
                ? "bg-black/20 border-white/10 text-blue-100/90"
                : "bg-rbc-blue/80 border-rbc-blue/50 text-white",
            )}
          >
            <p className="text-sm leading-relaxed">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
