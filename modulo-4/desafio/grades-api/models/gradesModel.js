import mongoose from 'mongoose'

const gradeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, required: true },
  value: { 
    type: Number, 
    required: true,
    validate(value) {
      if(value < 0)
        throw new Error('O valor deve ser um número natural')
    }
  },
  lastModified: {
    type: Date,
    default: Date.now()
  }
},
{ toJSON: { virtuals: true } })

const Grades = mongoose.model('Grades', gradeSchema)

export default Grades