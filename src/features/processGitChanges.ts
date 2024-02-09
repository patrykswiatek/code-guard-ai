import path from 'path'
import { getPromptForFileExtension } from '../utils/get-prompt-for-file-extension'
import { handleError } from '../utils/handle-error'
import { executeCommand } from './execCommand'
import { generateCompletionWithOpenAI } from './openAICompletionGenerator'

const targetDirectory = process.env.PROJECT_DIRECTORY ?? ''
if (!targetDirectory) {
  throw new Error('The OPENAI_API_KEY environment variable is not set.')
}

export const processGitChanges = async () => {
  try {
    const changes = await executeCommand(
      'git status --porcelain',
      targetDirectory
    )
    const changeList = changes
      .split('\n')
      .filter((change) => Boolean(change) && !change.trim().startsWith('D'))

    for (const change of changeList) {
      const [, ...rest] = change.trim().split(' ')
      const filePath = rest.join(' ').trim()
      const fullFilePath = path.join(targetDirectory, filePath)
      const fileExtension = path.extname(filePath)

      const fileContents = await executeCommand(
        `cat "${fullFilePath}"`,
        targetDirectory
      )

      const prompt = getPromptForFileExtension(fileExtension)
      if (!prompt) continue

      await generateCompletionWithOpenAI(prompt, fileContents)
    }
  } catch (error) {
    handleError(error)
  }
}
