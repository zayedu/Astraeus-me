import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-blue-50 relative overflow-hidden flex">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  )
}
