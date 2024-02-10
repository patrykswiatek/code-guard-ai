import path from 'path'
import { Choice } from 'prompts'

export const createMultiselectListFromChanges = (changeList: string[]): Choice[] => {
  return changeList.map((change) => {
    const changeTrimmed = change.trim();
    const filePath = changeTrimmed.slice(changeTrimmed.indexOf(' ') + 1).trim();
    const fileName = path.basename(filePath);

    return {
      title: fileName,
      value: filePath,
      selected: true,
    }
  })
}
