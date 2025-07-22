"use client"

import type React from "react"
import { useState } from "react"

interface ParGenerationProps {
  onParGenerated: (par: number) => void
}

const ParGeneration: React.FC<ParGenerationProps> = ({ onParGenerated }) => {
  const [parValue, setParValue] = useState<number | null>(null)

  const handleGeneratePar = () => {
    // Generate a random par value between 3 and 5 (inclusive)
    const randomPar = Math.floor(Math.random() * 3) + 3
    setParValue(randomPar)
    onParGenerated(randomPar)
  }

  return (
    <div>
      <button onClick={handleGeneratePar}>Generate Par</button>
      {parValue !== null && <p>Generated Par: {parValue}</p>}
    </div>
  )
}

export default ParGeneration
