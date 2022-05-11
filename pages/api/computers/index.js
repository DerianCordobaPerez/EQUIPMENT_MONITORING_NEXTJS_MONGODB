import connect from 'libs/database'
import Computer from 'models/computer'

export default async function handler(req, res) {
  const { method } = req

  await connect()

  switch (method) {
    case 'GET':
      try {
        const computers = await Computer.find({})
        res.status(200).json({ success: true, data: computers })
      } catch (err) {
        res.status(500).json({ success: false })
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
