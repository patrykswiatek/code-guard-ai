import { exec } from 'child_process'

export const executeCommand = (
  command: string,
  workingDirectory: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(
      command,
      { cwd: workingDirectory },
      (err: Error | null, stdout: string, stderr: string) => {
        switch (true) {
          case !!err:
            reject(new Error(`Error executing command: ${err.message}`))
            break
          case !!stderr:
            reject(new Error(`Command resulted in an error: ${stderr}`))
            break
          default:
            resolve(stdout.trim())
        }
      }
    )
  })
}
