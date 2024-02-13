import { runShellCommand } from '@/features/runShellCommand'
import { createMultiselectListFromChanges } from '@/utils/create-multiselect-list-from-changes'
import { logAndRethrowError } from '@/utils/log-and-rethrow-error'

const { PROJECT_DIRECTORY } = process.env
const DELETED_FILE_INDICATOR = 'D'

if (!PROJECT_DIRECTORY) {
  throw new Error('The PROJECT_DIRECTORY environment variable is not set.')
}

export const getNonDeletedChangedFilesForSelection = async () => {
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

    return createMultiselectListFromChanges(modifiedFiles)
  } catch (error) {
    logAndRethrowError(error)
  }
}
