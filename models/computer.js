import mongoose, { model, Schema } from 'mongoose'
import { execute } from 'utils/commands'
import { calculateTimeCallback } from 'utils/time'

/* Creating a schema for the computer model. */
const computerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  commands: {
    type: [String],
    required: true,
  },
})

/**
 * It returns true if the server is connected to the internet, false otherwise
 * @returns A function that takes an object with an ip property and returns a promise that resolves to
 * true if the ip is connected to the internet and false if it is not.
 */
export async function isConnected({ ip }) {
  return await execute({
    command: 'ping',
    flags: ['-c', '1', '-i', '0.2', '-w', '1', ip],
  })
}

/**
 * It takes an IP address and a role, finds the computer with that IP address, and then runs the
 * commands associated with that role on that computer
 * @returns An array of objects with the name of the command and the output of the command.
 */
export async function run({ ip, commands, role }) {
  return Promise.all(
    [...commands, role].map(async (command) => {
      const { output, time } = await calculateTimeCallback(execute, {
        command: './monitoring.sh',
        flags: [ip, command],
      })

      return {
        name: command,
        output,
        time,
      }
    }),
  )
}

export default mongoose.models.Computer || model('Computer', computerSchema)
