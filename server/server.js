import express from 'express'
import io from 'socket.io'
import http from 'http'
import mongoose from 'mongoose'

import config from './config'
import userModel from './mongodb/models'

const server = express()
const ioServer = http.createServer(server)

const PORT = config.port // берем переменную из .env

server.use('/extra', express.static(`${__dirname}/public`)) // при огромных нагрузках в 100к пользвателей, именно статик жрет больше всего производительности в Node.js
// отсюда выгружаем статические данные, которые не меняются
// в зависимости от пользователя. Текст/картинки/стили
server.use(express.json({ limit: '50kb' }))
server.use((req, res, next) => {
  console.log(`${new Date()}: ${req.url} ${req.method} from ${req.ip}`)
  next()
})

let msgHistory = [] // загулшка(вместо БД)

server.get('/', (req, res) => {
  res.send('express serv dude')
})

if (config.socketStatus) {
  console.log('Socket_IO status is:', config.socketStatus)
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

if (config.mongoStatus) {
  console.log('mongodb status is:', config.mongoStatus)
  mongoose.connect(config.mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  server.post('/api/v1/add', (req, res) => {
    const newUser = req.body
    userModel.create(newUser)
    res.send('user added to mongobase')
  })
}

ioServer.listen(PORT, () => {
  console.log(`serving at http://localhost:${PORT}/`)
})
