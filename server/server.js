const { resolve } = require('path')

import express from 'express'
import io from 'socket.io'
// import favicon from 'serve-favicon'
import regeneratorRuntime from 'regenerator-runtime'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import http from 'http'

import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import User from './mongodb/User.models'

import config from './config'

const server = express()
const ioServer = http.createServer(server)

const PORT = config.port // берем переменную из .env

const middleware = [
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist')),
  // favicon(`${__dirname}/public/favicon.ico`),
  passport.initialize()
]

passport.use('jwt', passportJWT.jwt);

middleware.forEach((it) => server.use(it))

// server.use('/extra', express.static(`${__dirname}/public`)) // при огромных нагрузках в 100к пользвателей, именно статик жрет больше всего производительности в Node.js
// // отсюда выгружаем статические данные, которые не меняются
// // в зависимости от пользователя. Текст/картинки/стили
// server.use(express.json({ limit: '50kb' })) // парсит данные, чтобы мы могли получать json-данные с помощью запросов ниже
// // server.use((req, res, next) => {
// //   console.log(`${new Date()}: ${req.url} ${req.method} from ${req.ip}`)
// //   next()
// // })

let msgHistory = [] // загулшка(вместо БД)

mongooseService.connect()

// const user = new User({
//   email: 'f@gmail.com',
//   password: 'abcd'
// })
// user.save()   // тестовое создание пользователя ручками

server.get('/', (req, res) => {
  res.send('express serv dude')
})

server.post('/api/v1/auth', async (req, res) => {
  console.log(req.body)
  try {
  const user = await User.findAndValidateUser(req.body)
  const payload = { uid: user.id }
  const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
  res.json({ status: 'ok', token })
  } catch(err) {
    console.log(err)
        res.json({ status: 'error', err })
  }
})

console.log('Socket_IO status is:', config.socketStatus)
if (config.socketStatus === 'true') {
  const socketIO = io(ioServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`user with id: ${socket.id} is finally connected`)
    socketIO.to(socket.id).emit('messageHistory', msgHistory) // обновление истории сообщений будет происходить только у пользователя, который подключился, а не у всех сразу

    socket.on('newMessage', (arg) => {
      msgHistory.push(arg) // сообщение после отправки добавляется в историю сообщений
      socketIO.emit('messageHistory', msgHistory) // обновленная история сообщений отправляется всем клиентам
    })

    socket.on('disconnect', () => {
      console.log(`the session of user: ${socket.id} is OVER`)
    })
  })
}

ioServer.listen(PORT, () => {
  console.log(`serving at http://localhost:${PORT}/`)
})
