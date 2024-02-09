import { PROMPT_MAPPING } from '../constants/prompts'

export const getPromptForFileExtension = (fileExtension: string): string | null => {
  return PROMPT_MAPPING[fileExtension] ?? null
}
