import { recentPars, parStates, type ParState } from "@/lib/mock-data"

export class APIService {
  private parGenerationCount = 0
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

  async generateParSection(query: string, currentContent: string) {
    this.parGenerationCount++
    await new Promise((r) => setTimeout(r, 600))

    const response: {
      updatedPar: string
      explanation: string
      draft_par?: string
    } = {
      updatedPar: currentContent + `\n\n> **Update:** ${query}`,
      explanation: `Added a note based on your input: “${query}”`,
    }

    if (this.parGenerationCount >= 2) {
      response.explanation += "\n\nA draft PDF is now available for preview."
      // A base64-encoded dummy PDF saying "Hello World!"
      response.draft_par =
        "data:application/pdf;base64,JVBERi0xLjAKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUiBdCi9Db3VudCAxCi9NZWRpYUJveCBbMCAwIDMwMCAxNDRdCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMiAwIFIKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+Cj4+Cj4+Ci9Db250ZW50cyA0IDAgUgo+PgplbmRvYmoKNCAwIG9iago8PAovTGVuZ3RoIDU1Cj4+CnN0cmVhbQpCVCAvRjEgMTggVGYgMTAgMTAgVGQgKEhlbGxvIFdvcmxkISkgVGoNCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDUKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEyIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzQwIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNQovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDY0CiUlRU9GCg=="
    }

    return response
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
