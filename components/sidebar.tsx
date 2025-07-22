"use client"

import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { BrainCircuit, FilePlus, LayoutDashboard, Files } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/documents", label: "Documents", icon: Files },
]

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="w-72 h-screen bg-black/20 backdrop-blur-2xl border-r border-white/10 flex flex-col p-4 gap-6">
      <div className="flex items-center gap-3 p-2">
        <div className="relative w-10 h-10 bg-gradient-to-br from-rbc-blue via-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg border border-white/10">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">Astraeus</h1>
      </div>

      <Link
        to="/dashboard/par/new/edit"
        className="group flex items-center justify-center gap-2 w-full px-4 py-3 bg-rbc-blue text-white rounded-lg hover:bg-rbc-blue/80 transition-all duration-300 shadow-lg hover:shadow-glow-blue transform hover:-translate-y-0.5 font-semibold"
      >
        <FilePlus size={18} />
        New PAR
      </Link>

      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-200/80 hover:text-white hover:bg-white/10 transition-all duration-200",
                isActive && "bg-white/10 text-white shadow-inner",
              )}
            >
              <div className="relative">
                <link.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-rbc-yellow" : "")} />
                {isActive && (
                  <div className="absolute -top-1 -left-1 w-7 h-7 bg-rbc-yellow/20 rounded-full blur-md"></div>
                )}
              </div>
              <span className="font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
