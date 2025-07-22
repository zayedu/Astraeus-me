import { MainLayout } from "@/components/main-layout"

interface PAR_EditPageProps {
  params: {
    id: string
  }
}

export default function PAR_EditPage({ params }: PAR_EditPageProps) {
  // This page renders the MainLayout for editing an existing PAR.
  // The `parId` is passed from the URL, so it starts in split-screen mode.
  return <MainLayout parId={params.id} />
}
