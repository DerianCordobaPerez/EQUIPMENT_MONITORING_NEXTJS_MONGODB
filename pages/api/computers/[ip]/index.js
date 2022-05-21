import connect from 'libs/database'
import Computer, { isConnected, run } from 'models/computer'

export default async function handler(req, res) {
  const {
    query: { ip },
    method,
  } = req

  await connect()

  switch (method) {
    case 'GET':
      try {
        const computer = await Computer.findOne({ ip })

        if (!computer) {
          res.status(404).json({ success: false })
        }

        const connected = await isConnected({ ip })
        const commands =
          connected &&
          (await run({
            ip,
            commands: computer.commands,
            role: computer.role,
          }))

        res.status(200).json({
          success: true,
          data: {
            ...computer._doc,
            commands,
            connected,
          },
        })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const computer = await Computer.findOneAndUpdate({ ip }, req.body, {
          new: true,
          runValidators: true,
        })

        if (!computer) {
          res.status(404).json({ success: false })
        }

        res.status(200).json({ success: true, data: computer })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const computer = await Computer.findOneAndDelete({ ip })
        if (!computer) {
          res.status(404).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
