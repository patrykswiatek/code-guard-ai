import path from 'path'
import prompts from 'prompts'
import { logAndRethrowError } from '../utils/log-and-rethrow-error'
import { runShellCommand } from './runShellCommand'
import { generateCodeSuggestions } from './generateCodeSuggestions'
import { PROMPT_MAPPING } from '../constants/prompts'
import { createMultiselectListFromChanges } from '../utils/create-multiselect-list-from-changes'

const { PROJECT_DIRECTORY } = process.env
const DELETED_FILE_INDICATOR = 'D'

if (!PROJECT_DIRECTORY) {
  throw new Error('The PROJECT_DIRECTORY environment variable is not set.')
}

export const processRepositoryChanges = async () => {
  try {
    const gitStatus = await runShellCommand(
      'git status --porcelain',
      PROJECT_DIRECTORY
    )
    const modifiedFiles = gitStatus
      .split('\n')
      .filter(
        (statusLine) =>
          statusLine && !statusLine.startsWith(DELETED_FILE_INDICATOR)
      )

    const fileSelectionPrompt = await prompts(
      {
        choices: createMultiselectListFromChanges(modifiedFiles),
        hint: '- Space to toggle, Enter to confirm',
        instructions: false,
        name: 'selectedFiles',
        message: 'Select the files you want to process:',
        type: 'multiselect',
      },
      { onCancel: () => process.exit(0) }
    )

    for (const selectedFilePath of fileSelectionPrompt.selectedFiles) {
      const absoluteFilePath = path.resolve(PROJECT_DIRECTORY, selectedFilePath)
      const fileExtension = path.extname(selectedFilePath).substring(1)

      const fileContent = await runShellCommand(
        `cat "${absoluteFilePath}"`,
        PROJECT_DIRECTORY
      )

      const openAIPrompt = PROMPT_MAPPING[fileExtension]
      if (!openAIPrompt) continue

      await generateCodeSuggestions(openAIPrompt, fileContent)
    }
  } catch (error) {
    logAndRethrowError(error)
  }
}
