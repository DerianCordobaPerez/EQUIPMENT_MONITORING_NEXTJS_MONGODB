import { execSync } from 'child_process'

export function execute({ command }) {
  try {
    return execSync(command, {
      cwd: process.cwd(),
      encoding: 'utf-8',
      timeout: 500,
    })
  } catch (e) {
    return false
  }
}
