import { execute } from 'utils/commands'
import Computer from 'models/computer'

export default async function handle(req, res) {
  const {
    query: { ip },
    method,
  } = req

  switch (method) {
    case 'POST':
      try {
        const computer = await Computer.findOne({ ip })

        if (!computer) {
          res.status(404).json({ success: false })
        }

        const services = req.body.services
          .split(' ')
          .map((service) => `--${service}`)

        const result = execute({ command: `./backup.sh ${services}` })

        if (!result) {
          res.status(500).json({ success: false })
        }

        res
          .status(200)
          .json({ success: true, data: 'Backup done successfully.' })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
  }
}
