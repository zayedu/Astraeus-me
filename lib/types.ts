export interface Message {
  id: string
  text: string
  sender: "user" | "bot"
}

export type AppMode = "default" | "par_generation"

export interface PARGenerationProps {
  onClose: () => void
}
