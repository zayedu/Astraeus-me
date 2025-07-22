import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-blue-50 relative overflow-hidden flex">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
