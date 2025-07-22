/**
 * Lightweight in-memory mock store for PARs and chat history.
 * Replace these mocks with real API calls once the backend is ready.
 */

export type ParSummary = {
  id: string
  title: string
  lastModified: string
  status: "Approved" | "Draft" | "In Review"
  summary: string
}

export type ParState = {
  id: string
  title: string
  content: string
  chatHistory: { text: string; sender: "user" | "bot" }[]
}

/** Seed data — three PARs the logged-in user “owns”. */
export const recentPars: ParSummary[] = [
  {
    id: "par-1",
    title: "Digital Lending Platform Expansion",
    lastModified: "2025-07-19",
    status: "In Review",
    summary:
      "Proposal to expand our digital lending services to the small and medium-sized enterprise (SME) market segment.",
  },
  {
    id: "par-2",
    title: "AI-Driven Risk Scoring Engine",
    lastModified: "2025-07-10",
    status: "Approved",
    summary: "Develop a new machine learning model for more accurate and real-time credit risk assessment.",
  },
  {
    id: "par-3",
    title: "Sustainable Banking Initiative",
    lastModified: "2025-06-28",
    status: "Draft",
    summary: "Launch a new suite of green investment products and ESG-aligned financial instruments.",
  },
]

/** Detailed mock documents keyed by ID. */
export const parStates: Record<string, ParState> = {
  "par-1": {
    id: "par-1",
    title: "Digital Lending Platform Expansion",
    content: `# Digital Lending Platform Expansion

**Budget:** \$5 M  
**Timeline:** 9 months

## Objective
Expand the existing digital lending platform to new segments …`,
    chatHistory: [
      { text: "Summarise risks for market entry.", sender: "user" },
      { text: "Key risks include regulatory compliance …", sender: "bot" },
    ],
  },
  "par-2": {
    id: "par-2",
    title: "AI-Driven Risk Scoring Engine",
    content: `# AI-Driven Risk Scoring Engine

**Budget:** \$3 M  
**Timeline:** 6 months

## Objective
Build a machine-learning model to …`,
    chatHistory: [
      { text: "Add KPIs around false-positive reduction.", sender: "user" },
      { text: "Included KPIs: FPR < 2 %.", sender: "bot" },
    ],
  },
  "par-3": {
    id: "par-3",
    title: "Sustainable Banking Initiative",
    content: `# Sustainable Banking Initiative

**Budget:** \$7 M  
**Timeline:** 12 months

## Objective
Launch green products that align with ESG goals …`,
    chatHistory: [
      { text: "Insert projected carbon-offset impact.", sender: "user" },
      { text: "Projected offset: 25 000 t CO₂ / year.", sender: "bot" },
    ],
  },
}
