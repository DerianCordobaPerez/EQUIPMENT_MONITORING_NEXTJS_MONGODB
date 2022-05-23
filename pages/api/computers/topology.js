import { execute } from 'utils/commands'

export default async function handle(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const network = await execute({
          command: './monitoring.sh',
          flags: ['192.168.56.0', 'topology'],
        })

        if (!network) {
          res.status(500).json({
            success: false,
          })
        }

        res.status(200).json({ success: true, data: network })
      } catch (e) {
        res.status(400).json({
          success: false,
          error: e.message,
        })
      }
      break
  }
}
