import express from 'express'
import { Server } from 'socket.io'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { createServer } from 'http'

// eslint-disable-next-line
import regeneratorRuntime from 'regenerator-runtime'

import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import userModels from './mongodb/User.models'
import config from './config'

const { resolve } = require('path')

const app = express()
const httpServer = createServer(app)

const PORT = config.port // берем переменную из .env

const middleware = [
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist')),
  // favicon(`${__dirname}/public/favicon.ico`),
  passport.initialize()
]

passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => app.use(it))

// app.use('/extra', express.static(`${__dirname}/public`)) // при огромных нагрузках в 100к пользвателей, именно статик жрет больше всего производительности в Node.js
// // отсюда выгружаем статические данные, которые не меняются
// // в зависимости от пользователя. Текст/картинки/стили
// app.use(express.json({ limit: '50kb' })) // парсит данные, чтобы мы могли получать json-данные с помощью запросов ниже
// // app.use((req, res, next) => {
// //   console.log(`${new Date()}: ${req.url} ${req.method} from ${req.ip}`)
// //   next()
// // })

mongooseService.connect()

// const user = new User({
//   email: 'texas@gmail.com',
//   password: '239',
//   role: ['user', 'admin']
// })
// user.save() // тестовое создание пользователя ручками

// app.get('/api/v1/user-info', rights(['admin']), (req, res) => {
//   res.json({ status: 'AT-ST is ready' })
// })

app.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await userModels.findById(jwtUser.uid)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

app.post('/api/v1/auth', async (req, res) => {
  console.log(req.body)
  try {
    const user = await userModels.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

app.post('/api/v1/new_user', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await userModels.create({ name, email, password })
    console.log(user)
    res.json({ status: 'ok', user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'invalid data' })
  }
})

let msgHistory = [] // загулшка(вместо БД)

console.log('Socket_IO status is:', config.socketStatus)
if (config.socketStatus) {
  const io = new Server(httpServer, {
    path: '/ws'
  })

  io.on('connection', (socket) => {
    console.log(`user with id: ${socket.id} is finally connected`)
    io.to(socket.id).emit('messageHistory', msgHistory) // обновление истории сообщений будет происходить только у пользователя, который подключился, а не у всех сразу

    socket.on('newMessage', (arg) => {
      msgHistory.push(arg) // сообщение после отправки добавляется в историю сообщений
      io.emit('messageHistory', msgHistory) // обновленная история сообщений отправляется всем клиентам
    })
    socket.on('disconnect', () => {
      console.log(`the session of user: ${socket.id} is OVER`)
    })
  })
}

httpServer.listen(PORT, () => {
  console.log(`serving at http://localhost:${PORT}/`)
})
