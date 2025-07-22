"use client"

import { MessageItem } from "./message-item"

interface Message {
  text: string
  sender: "user" | "bot"
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((msg, index) => (
        <MessageItem key={index} message={msg} index={index} />
      ))}
    </div>
  )
}
