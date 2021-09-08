import { model, Model, Schema } from 'mongoose'
import { user } from '../types'

const userSchema = new Schema<user, Model<user>, user>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  name: String,
  avatarURL: String,
  passwordHash: String,
  questions: Array,
  answers: {
    type: Map,
    of: String,
    default: {}
  }})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

export default User