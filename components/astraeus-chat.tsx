"use client"

// components/astraeus-chat.tsx

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface Message {
  id: string
  sender: string
  text: string
  timestamp: Date
}

interface AstraeusChatProps {
  userId: string
}

const AstraeusChat: React.FC<AstraeusChatProps> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate fetching initial messages (replace with actual API call)
    const initialMessages: Message[] = [
      { id: "1", sender: "Astraeus", text: "Welcome to the chat!", timestamp: new Date() },
      { id: "2", sender: userId, text: "Hello!", timestamp: new Date() },
    ]
    setMessages(initialMessages)

    // Scroll to bottom on initial load and when new messages are added
    scrollToBottom()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const message: Message = {
        id: String(Date.now()), // Generate a unique ID
        sender: userId,
        text: newMessage,
        timestamp: new Date(),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
  }

  return (
    <div className="flex flex-col h-96 border border-gray-300 rounded-md shadow-sm">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.sender === userId ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block rounded-lg py-2 px-3 ${
                message.sender === userId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              <div className="text-xs font-semibold">{message.sender}</div>
              <div>{message.text}</div>
              <div className="text-xs text-gray-500">{message.timestamp.toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300">
        <div className="flex">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Type your message..."
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <button
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default AstraeusChat
