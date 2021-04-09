import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: String,
    role: {
      type: [String],
      default: ['user']
    },
    e_mail: String,
    password: String
  },
  {
    timestamp: true // чтобы были поля любого изменения объекта с 'time' этого изменения
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModifyed('password')) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password)
  return next()
})

export default mongoose.model('users', userSchema)
