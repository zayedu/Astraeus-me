"use client"

import { useParams } from "react-router-dom"
import { MainLayout } from "@/components/main-layout"

export default function PAR_EditPage() {
  const { id } = useParams<{ id: string }>()
  // This page renders the MainLayout for editing an existing PAR.
  // The `parId` is passed from the URL, so it starts in split-screen mode.
  return <MainLayout parId={id} />
}
