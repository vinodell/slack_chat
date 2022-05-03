import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    role: {
      type: [String],
      default: ['user']
    },
    email: {
      type: String,
      required: true, // обязательное поле, иначе будет ошибка
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamp: true // чтобы были поля любого изменения объекта с 'time' этого изменения
  }
)

userSchema.pre('save', async (next) => {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password)
  return next()
})

userSchema.method({
  passwordMatches(password) {
    console.log(bcrypt.hashSync(password))
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser ({ email, password }) {
    if (!email) {
      throw new Error('No email, dude')
    }
    if (!password) {
      throw new Error('No password, dude')
    }
    const user = await this.findOne({ email }).exec()
    if (!user) {
      throw new Error('There is no such user, dude')
    }
    const isPasswordOk = await user.passwordMatches(password)
    if (!isPasswordOk) {
      throw new Error('password is incorrect')
    }
    return user
  }
}

export default mongoose.model('slack', userSchema)
