import { PromptMapping } from '../types/prompt-mapping.interface'

export const PROMPT_MAPPING: PromptMapping = {
  tsx: `
  Review TypeScript React (.tsx) code. Provide feedback as follows:
  - For renaming: list new names only.
  - For code changes: generate diffs for altered lines exclusively.
  - Highlight performance optimizations.
  - Describe accessibility improvements.
  - Specify TypeScript type safety and best practices.
  Always list only the things that need improvement.`,
  ts: `
  Improve TypeScript/JavaScript code. Identify only parts to change for:
  - TypeScript best practices.
  - Performance.
  - Readability.
  - Anti-patterns and naming.
  - Use of interfaces, types, enums.
  - Generate diffs for altered lines exclusively.
  Always list only the things that need improvement.`,
  js: `
  Improve TypeScript/JavaScript code. Identify only parts to change for:
  - TypeScript best practices.
  - Performance.
  - Readability.
  - Anti-patterns and naming.
  - Use of interfaces, types, enums.
  - Generate diffs for altered lines exclusively.
  Always list only the things that need improvement.`,
  css: `
  Refactor Tailwind CSS. Point out only:
  - Class names to change.
  - Generate diffs for altered lines exclusively.`,
}
