"use client"

import Link from "next/link"
import { X, Sparkles, BrainCircuit } from "lucide-react"

interface HeaderProps {
  title: string
  showCloseButton?: boolean
  onClose?: () => void
}

export function Header({ title, showCloseButton, onClose }: HeaderProps) {
  return (
    <div className="p-4 border-b border-white/10 flex-shrink-0 flex items-center justify-between">
      <Link href="/dashboard" className="flex items-center gap-4 group">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-rbc-blue to-rbc-yellow rounded-lg blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
          <div className="relative w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-colors">
            <BrainCircuit className="w-6 h-6 text-rbc-yellow" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-blue-100/90 flex items-center gap-2 group-hover:text-white transition-colors">
          <Sparkles size={18} className="text-rbc-yellow" />
          {title}
        </h2>
      </Link>
      {showCloseButton && (
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={20} className="text-blue-200" />
        </button>
      )}
    </div>
  )
}
