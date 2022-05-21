import spawn from 'await-spawn'

/**
 * It runs a command and returns the output as a string
 * @returns The result of the command being executed.
 */
export async function execute({ command, flags }) {
  try {
    return (await spawn(command, flags)).toString()
  } catch (e) {
    return false
  }
}
