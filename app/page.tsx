"use client"

import { useRouter } from "next/navigation"
import { BrainCircuit, KeyRound } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = () => {
    // In a real app, this would trigger the OAuth flow.
    // Here, we'll just navigate to the dashboard.
    router.push("/dashboard")
  }

  return (
    <main className="h-screen w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-blue-50 relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rbc-blue/20 rounded-full mix-blend-lighten filter blur-3xl opacity-50 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rbc-yellow/10 rounded-full mix-blend-lighten filter blur-3xl opacity-50 animate-float-delayed"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center p-8 animate-fade-in">
        <div className="relative mb-8 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-rbc-blue to-rbc-yellow rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="relative w-20 h-20 bg-slate-900/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white/10">
            <BrainCircuit className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent tracking-tight mb-2">
          Welcome to Astraeus
        </h1>
        <p className="text-blue-200/70 mb-10 text-lg">RBC's Neural Analytics Interface</p>

        <button
          onClick={handleLogin}
          className="relative group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-rbc-blue to-blue-600 text-white font-semibold rounded-xl shadow-2xl shadow-rbc-blue/25 transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:shadow-rbc-blue/40"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rbc-yellow to-rbc-blue rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <KeyRound className="relative w-5 h-5" />
          <span className="relative">Sign In with RBC SSO</span>
        </button>
      </div>
    </main>
  )
}
