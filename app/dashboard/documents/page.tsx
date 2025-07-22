"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, FileText, MoreHorizontal, Pencil, Search, LoaderCircle } from "lucide-react"
import { APIService } from "@/services/api"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface ParDocument {
  id: string
  title: string
  status: "Approved" | "Draft" | "In Review"
  lastModified: string
  summary: string
}

const apiService = new APIService()

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<ParDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchDocs = async () => {
      setIsLoading(true)
      const docs = await apiService.getRecentPars()
      setDocuments(docs)
      setIsLoading(false)
    }
    fetchDocs()
  }, [])

  const getStatusClass = (status: ParDocument["status"]) => {
    switch (status) {
      case "Approved":
        return "border-green-500/50 bg-green-500/10 text-green-400"
      case "In Review":
        return "border-amber-500/50 bg-amber-500/10 text-amber-400"
      case "Draft":
      default:
        return "border-sky-500/50 bg-sky-500/10 text-sky-400"
    }
  }

  const filteredDocuments = documents.filter((doc) => doc.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-8 animate-fade-in h-full flex flex-col">
      <header className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-2 tracking-tight">
          PAR Documents
        </h1>
        <p className="text-blue-200/80 text-lg">Browse, edit, and export your recent Project Approval Requests.</p>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200/50" />
        <Input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md pl-12 pr-4 py-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-rbc-blue/50 text-white placeholder-blue-200/50"
        />
      </div>

      <div className="flex-1 overflow-y-auto -mx-4 px-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-blue-200/70">
            <LoaderCircle className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocuments.map((doc, index) => (
              <div
                key={doc.id}
                className="group animate-fade-in relative flex flex-col bg-white/[0.02] border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-rbc-blue/50 hover:bg-rbc-blue/[0.05] hover:shadow-2xl hover:shadow-rbc-blue/10 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-gradient-to-br from-rbc-yellow/20 to-amber-400/10 rounded-lg flex-shrink-0">
                      <FileText className="w-5 h-5 text-rbc-yellow" />
                    </div>
                    <h3 className="font-semibold text-lg text-white truncate">{doc.title}</h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 rounded-md text-blue-200/60 hover:bg-white/10 hover:text-white transition-opacity flex-shrink-0">
                        <MoreHorizontal size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-slate-800/80 backdrop-blur-lg border-white/20 rounded-lg shadow-xl text-blue-50"
                    >
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/dashboard/par/${doc.id}/edit`}
                          className="flex items-center gap-2 cursor-pointer focus:bg-rbc-blue/50"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit with Co-Pilot</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer focus:bg-rbc-blue/50">
                        <Download className="mr-2 h-4 w-4" />
                        <span>Export as PDF</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-blue-200/70 text-sm flex-grow mb-4 leading-relaxed">{doc.summary}</p>

                <div className="flex items-center justify-between text-xs text-blue-200/60 mt-auto pt-4 border-t border-white/10">
                  <span className={cn("px-2.5 py-1 font-medium rounded-md border text-xs", getStatusClass(doc.status))}>
                    {doc.status}
                  </span>
                  <span>Modified: {doc.lastModified}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
