import connect from 'libs/database'
import Computer, { isConnected } from 'models/computer'

export default async function handler(req, res) {
  const { method } = req

  await connect()

  switch (method) {
    case 'GET':
      try {
        const computers = await Computer.find({})

        const connected = await Promise.all(
          computers.map(async ({ ip }) => {
            const connected = await isConnected({ ip })
            return connected ? 'online' : 'offline'
          }),
        )

        if (!computers.length) {
          res.status(500).json({ success: false })
        }

        res.status(200).json({
          success: true,
          data: computers.map(({ _doc: computer }, index) => ({
            ...computer,
            connected: connected[index],
          })),
        })
      } catch (err) {
        res.status(500).json({ success: false, error: err.message })
      }
      break
    case 'POST':
      try {
        const computer = await Computer.create(req.body)
        res.status(201).json({ success: true, data: computer })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
