import Computer from 'models/computer'
import { execute } from 'utils/commands'

export default async function handle(req, res) {
  const {
    query: { ip },
    method,
  } = req

  switch (method) {
    case 'POST':
      try {
        const computer = Computer.findOne({ ip })

        if (!computer) {
          res.status(500).json({ success: false })
        }

        const services = req.body.services.map((service) => `--${service}`)
        const { file } = req.body

        const flags = [ip, file, ...services]

        await execute({
          command: './restore.sh',
          flags,
        })

        res.status(200).json({ success: true })
      } catch (e) {
        res.status(400).json({ success: false, error: e.message })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
