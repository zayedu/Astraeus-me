"use client"

import { BarChart, Home, Shield, TrendingUp } from "lucide-react"

const suggestions = [
  {
    icon: <TrendingUp className="w-7 h-7 text-rbc-yellow" />,
    title: "Analyze Market Trends",
    query: "Analyze the latest market trends for the tech sector.",
  },
  {
    icon: <BarChart className="w-7 h-7 text-rbc-yellow" />,
    title: "Summarize Portfolio",
    query: "Summarize my current investment portfolio performance.",
  },
  {
    icon: <Shield className="w-7 h-7 text-rbc-yellow" />,
    title: "Assess Risk",
    query: "Assess the risk level of adding cryptocurrency to my portfolio.",
  },
  {
    icon: <Home className="w-7 h-7 text-rbc-yellow" />,
    title: "Generate PAR",
    query: "Generate a PAR for a new analytics dashboard.",
  },
]

interface WelcomeScreenProps {
  onSuggestionClick: (query: string) => void
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-3">
        Astraeus Neural Interface
      </h2>
      <p className="text-blue-200/70 mb-10 max-w-md">
        Connect to your RBC datasets and unlock insights through natural language.
      </p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {suggestions.map((item) => (
          <button
            key={item.title}
            onClick={() => onSuggestionClick(item.query)}
            className="group p-4 bg-black/20 border border-white/10 rounded-xl shadow-lg hover:border-white/20 hover:bg-black/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-glow-blue"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-rbc-blue/50 to-slate-800 rounded-lg transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              <p className="font-semibold text-sm text-blue-100/90 text-left">{item.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
