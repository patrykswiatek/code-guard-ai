import path from 'path'

import { PROMPT_MAPPING } from '@/constants/prompts'
import { generateCodeSuggestions } from '@/features/generateCodeSuggestions'
import { runShellCommand } from '@/features/runShellCommand'
import { logAndRethrowError } from '@/utils/log-and-rethrow-error'
import ws from 'ws'

const { PROJECT_DIRECTORY } = process.env

if (!PROJECT_DIRECTORY) {
  throw new Error('The PROJECT_DIRECTORY environment variable is not set.')
}

export const processRepositoryChanges = async (
  selectedFiles: string[],
  websocket: ws
) => {
  try {
    for (const selectedFilePath of selectedFiles) {
      const absoluteFilePath = path.resolve(PROJECT_DIRECTORY, selectedFilePath)
      const fileExtension = path.extname(selectedFilePath).substring(1)

      const fileContent = await runShellCommand(
        `cat "${absoluteFilePath}"`,
        PROJECT_DIRECTORY
      )

      const openAIPrompt = PROMPT_MAPPING[fileExtension]
      if (!openAIPrompt) continue

      await generateCodeSuggestions(openAIPrompt, fileContent, websocket)
    }
  } catch (error) {
    logAndRethrowError(error)
  }
}
