import path from 'path'
import { handleError } from '../utils/handle-error'
import { executeCommand } from './execCommand'
import { generateCompletionWithOpenAI } from './openAICompletionGenerator'
import { PROMPT_MAPPING } from '../constants/prompts'

const { PROJECT_DIRECTORY } = process.env

if (!PROJECT_DIRECTORY) {
  throw new Error('The OPENAI_API_KEY environment variable is not set.')
}

export const processGitChanges = async () => {
  try {
    const changes = await executeCommand(
      'git status --porcelain',
      PROJECT_DIRECTORY
    )
    const changeList = changes
      .split('\n')
      .filter((change) => Boolean(change) && !change.trim().startsWith('D'))

    for (const change of changeList) {
      const [, ...rest] = change.trim().split(' ')
      const filePath = rest.join(' ').trim()
      const fullFilePath = path.join(PROJECT_DIRECTORY, filePath)
      const fileExtension = path.extname(filePath).slice(1)

      const fileContents = await executeCommand(
        `cat "${fullFilePath}"`,
        PROJECT_DIRECTORY
      )

      const prompt: string | undefined = PROMPT_MAPPING[fileExtension]
      if (!prompt) continue

      await generateCompletionWithOpenAI(prompt, fileContents)
    }
  } catch (error) {
    handleError(error)
  }
}
