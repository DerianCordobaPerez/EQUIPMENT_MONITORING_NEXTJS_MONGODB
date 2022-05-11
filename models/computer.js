import mongoose, { model, Schema } from 'mongoose'

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
})

export default mongoose.models.Computer || model('Computer', computerSchema)
