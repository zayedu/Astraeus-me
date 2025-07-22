import { MainLayout } from "@/components/main-layout"

export default function HomePage() {
  return (
    <main className="h-screen w-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-blue-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rbc-blue/20 rounded-full mix-blend-lighten filter blur-3xl opacity-50 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rbc-yellow/10 rounded-full mix-blend-lighten filter blur-3xl opacity-50 animate-float-delayed"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>
      <MainLayout />
    </main>
  )
}
