import path from 'path'
import { randomUUID } from 'crypto'

export const createMultiselectListFromChanges = (changeList: string[]) => {
  return changeList.map((change) => {
    const changeTrimmed = change.trim()
    const filePath = changeTrimmed.slice(changeTrimmed.indexOf(' ') + 1).trim()
    const fileName = path.basename(filePath)

    return { id: randomUUID(), label: fileName, value: filePath }
  })
}
