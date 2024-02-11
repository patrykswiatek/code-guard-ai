import { exec } from 'child_process';

export const runShellCommand = (
  shellCommand: string,
  executionPath: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(
      shellCommand,
      { cwd: executionPath },
      (error: Error | null, standardOutput: string, standardError: string) => {
        if (error) {
          reject(new Error(`Error executing shell command: ${error.message}`));
        } else if (standardError) {
          reject(new Error(`Shell command resulted in an error: ${standardError}`));
        } else {
          resolve(standardOutput.trim());
        }
      }
    );
  });
};
