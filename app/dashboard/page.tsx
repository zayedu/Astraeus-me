"use client"

import Link from "next/link"
import { BrainCircuit, Files, MessageSquare, FilePlus } from "lucide-react"

const navItems = [
  {
    href: "/dashboard/chat",
    icon: MessageSquare,
    title: "Insights Co-Pilot",
    description: "Engage with the AI to analyze financial data and get insights.",
    color: "text-rbc-blue",
    shadow: "hover:shadow-glow-blue",
  },
  {
    href: "/dashboard/documents",
    icon: Files,
    title: "PAR Documents",
    description: "Browse, search, and manage your existing PAR documents.",
    color: "text-rbc-yellow",
    shadow: "hover:shadow-glow-yellow",
  },
  {
    href: "/dashboard/par/new/edit",
    icon: FilePlus,
    title: "New PAR",
    description: "Start a new Project Approval Request with AI assistance.",
    color: "text-green-400",
    shadow: "hover:shadow-glow-green",
  },
]

export default function DashboardNavPage() {
  return (
    <main className="h-screen w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-blue-50 flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center text-center mb-12 animate-fade-in">
        <div className="relative mb-4">
          <div className="relative w-16 h-16 bg-gradient-to-br from-rbc-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10">
            <BrainCircuit className="w-9 h-9 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent tracking-tight">
          Astraeus Dashboard
        </h1>
        <p className="text-blue-200/70 mt-2 text-lg">Select a tool to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {navItems.map((item, index) => (
          <Link
            href={item.href}
            key={item.title}
            className={`group animate-fade-in-up relative flex flex-col items-center justify-center text-center bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/30 hover:-translate-y-2 ${item.shadow}`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative mb-4">
              <div
                className={`absolute -inset-2 bg-gradient-to-br from-rbc-blue to-rbc-yellow rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${item.color}/30`}
              ></div>
              <item.icon className={`relative w-12 h-12 ${item.color}`} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">{item.title}</h2>
            <p className="text-blue-200/70 text-sm leading-relaxed">{item.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
