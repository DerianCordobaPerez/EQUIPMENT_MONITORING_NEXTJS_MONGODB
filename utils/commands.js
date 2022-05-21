import spawn from 'await-spawn'

export async function execute({ command, flags }) {
  try {
    return (await spawn(command, flags)).toString()
  } catch (e) {
    return false
  }
}
