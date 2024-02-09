import { PromptMapping } from '../types/prompt-mapping.interface'

export const TSX_PROMPT = `
Review TypeScript React (.tsx) code. Provide feedback as follows:
- For renaming: list new names only.
- For code changes: generate diffs for altered lines exclusively.
- Highlight performance optimizations.
- Describe accessibility improvements.
- Specify TypeScript type safety and best practices.
Always list only the things that need improvement.`

export const CSS_TAILWIND_PROMPT = `
Refactor Tailwind CSS. Point out only:
- Class names to change.
- Generate diffs for altered lines exclusively.`

export const TS_JS_PROMPT = `
Improve TypeScript/JavaScript code. Identify only parts to change for:
- TypeScript best practices.
- Performance.
- Readability.
- Anti-patterns and naming.
- Use of interfaces, types, enums.
- Generate diffs for altered lines exclusively.
Always list only the things that need improvement.`

export const PROMPT_MAPPING: PromptMapping = {
  '.tsx': TSX_PROMPT,
  '.css': CSS_TAILWIND_PROMPT,
  '.ts': TS_JS_PROMPT,
  '.js': TS_JS_PROMPT,
}
