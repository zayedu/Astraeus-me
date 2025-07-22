import MarkdownIt from "markdown-it"

/**
 * Shared Markdown-to-HTML renderer.
 * Always feeds a string to markdown-it to avoid “Input data should be a String”.
 */
const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
}).use(require("markdown-it-attrs"))

export function renderMarkdown(source: unknown): string {
  return md.render(typeof source === "string" ? source : "")
}
