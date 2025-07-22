import { recentPars, parStates, type ParState } from "@/lib/mock-data"

export class APIService {
  /** GET /pars/list – mocked */
  async getRecentPars() {
    // simulate latency
    await new Promise((r) => setTimeout(r, 400))
    return recentPars
  }

  /** GET /pars/:id – mocked */
  async getParById(id: string): Promise<ParState> {
    await new Promise((r) => setTimeout(r, 400))
    if (!parStates[id]) throw new Error("PAR not found")
    return parStates[id]
  }

  /** Alias for legacy call in PARGeneration */
  async getParState(id: string) {
    return this.getParById(id)
  }

  /** POST /pars/:id/chat – mocked chat+update */
  async generateParSection(query: string, currentContent: string) {
    await new Promise((r) => setTimeout(r, 600))
    // simple echo behaviour for demo
    return {
      updatedPar: currentContent + `\n\n> **Update:** ${query}`,
      explanation: `Added a note based on your input: “${query}”`,
    }
  }

  /** POST /insights/query – mocked */
  async queryInsights(text: string): Promise<{ content: any }> {
    await new Promise((r) => setTimeout(r, 600))

    // If the user seems to be asking to start a PAR session,
    // return a “classification” payload so the chat knows to switch modes.
    if (text.toLowerCase().match(/(generate\s+par|project\s+approval)/)) {
      return { content: { classification: "par_generation" } }
    }

    // Otherwise just echo a canned bot-style answer.
    return {
      content:
        "Here’s a quick insight based on your query: **" +
        text +
        "**. (This is dummy data – replace with a real LLM call.)",
    }
  }
}
