import { model, Model, Schema } from 'mongoose'
import { question } from '../types'

const questionSchema = new Schema<question, Model<question>, question>({
  author: String,
  timestamp: Number,
  optionOne: {  
    votes: Array,
    text: String
  },
  optionTwo: {  
    votes: Array,
    text: String
  },
})

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Question = model('Question', questionSchema)

export default Question