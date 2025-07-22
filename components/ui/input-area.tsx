"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputAreaProps {
  disabled: boolean
  onSubmit: (query: string) => void
  placeholder: string
}

export function InputArea({ disabled, onSubmit, placeholder }: InputAreaProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !disabled) {
      onSubmit(query.trim())
      setQuery("")
    }
  }

  return (
    <div className="p-4 border-t border-white/10 flex-shrink-0">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
          className={cn(
            "w-full p-4 pr-16 bg-black/20 border border-white/10 rounded-xl resize-none transition-all duration-300",
            "focus:ring-2 focus:ring-rbc-blue focus:border-rbc-blue/80 text-blue-50 placeholder-blue-200/50",
            disabled && "cursor-not-allowed",
          )}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
        />
        <button
          type="submit"
          disabled={disabled || !query.trim()}
          className="absolute top-1/2 -translate-y-1/2 right-3 p-2.5 bg-rbc-blue text-white rounded-lg hover:bg-rbc-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-glow-blue"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
