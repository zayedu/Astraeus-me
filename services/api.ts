// Mock data as specified
const mockResponses = {
  normal: {
    content:
      "This is a mock financial data analysis. The current market trends show a positive outlook for tech stocks, while commodities are experiencing some volatility. We recommend diversifying your portfolio.",
  },
  parClassification: {
    content: {
      classification: "par_generation",
    },
  },
  parGenerated: {
    content:
      "## Project Approval Request: New Analytics Dashboard\n\n**Project Sponsor:** John Doe\n\n**Business Unit:** Digital Strategy\n\n**Date:** July 21, 2025\n\n### 1. Project Summary\n\nThis project aims to develop and deploy a new, state-of-the-art analytics dashboard to provide real-time insights into customer behavior and market trends. This will replace the legacy system, which is inefficient and lacks critical features.\n\n### 2. Business Case\n\nThe new dashboard is projected to increase operational efficiency by 20% and provide data-driven insights that could lead to a 5-10% increase in revenue through targeted marketing campaigns.\n\n### 3. Scope & Deliverables\n\n-   **In-Scope:** Dashboard design, backend development, data integration, user training.\n-   **Out-of-Scope:** Mobile application development.\n\n### 4. Financials\n\n| Category              | Cost          |\n| --------------------- |:-------------:|\n| **Initial Budget**    | **$150,000**  |\n| Personnel             | $80,000       |\n| Software & Licensing  | $40,000       |\n| Hardware & Infra      | $20,000       |\n| Contingency (10%)     | $10,000       |\n\n### 5. Timeline\n\n-   **Phase 1 (Discovery & Design):** 4 Weeks\n-   **Phase 2 (Development & Testing):** 12 Weeks\n-   **Phase 3 (Deployment & Training):** 8 Weeks\n-   **Total Estimated Timeline:** 6 Months\n\n### 6. Risks & Mitigation\n\n-   **Risk:** Data migration issues.\n-   **Mitigation:** Phased migration with rollback plans.\n\n### 7. Approval\n\nSeeking approval to proceed with the allocated budget and timeline.\n",
  },
}

const parBuilderResponses = {
  initial: {
    chatResponse: "Let's build your Project Approval Request. What is the project title?",
    parUpdate: "## Project Approval Request: [Project Title]",
  },
  title: {
    chatResponse: "Great. Now, what is the estimated budget?",
    parUpdate: "\n\n**Budget:** [Budget]",
  },
  budget: {
    chatResponse: "Understood. What's the timeline for this project?",
    parUpdate: "\n\n**Timeline:** [Timeline]",
  },
  default: {
    chatResponse: "I've updated the PAR. What's next?",
    parUpdate: "",
  },
}

export class APIService {
  // Using mocks as requested for the MVP
  private useMocks = true

  async queryInsights(query: string): Promise<any> {
    if (this.useMocks) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (query.toLowerCase().includes("generate par") || query.toLowerCase().includes("project approval")) {
        return mockResponses.parClassification
      }

      return mockResponses.normal
    }

    // Real API call would go here
    const response = await fetch("http://localhost:8080/insights/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
    return response.json()
  }

  async generatePar(): Promise<any> {
    if (this.useMocks) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return parBuilderResponses.initial
    }

    // Real API call
    const response = await fetch("http://127.0.0.1:8080/par/generate", { method: "POST" })
    return response.json()
  }

  async queryParBuilder(query: string, currentPar: string): Promise<any> {
    if (this.useMocks) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      let response
      if (currentPar.includes("[Project Title]")) {
        response = parBuilderResponses.title
        return {
          ...response,
          parUpdate: `## Project Approval Request: ${query}\n\n**Project Sponsor:** Jane Doe\n\n**Business Unit:** Digital Strategy`,
        }
      }
      if (currentPar.includes("[Budget]")) {
        response = parBuilderResponses.budget
        return { ...response, parUpdate: `\n\n**Budget:** ${query}` }
      }
      if (currentPar.includes("[Timeline]")) {
        response = parBuilderResponses.default
        return { ...response, parUpdate: `\n\n**Timeline:** ${query}` }
      }

      response = parBuilderResponses.default
      return { ...response, parUpdate: `\n\n${query}` }
    }
    // Real API call would go here
    return { chatResponse: "Error", parUpdate: "" }
  }
}
