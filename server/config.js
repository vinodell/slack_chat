require('dotenv').config() // библиотека, позволяющая читать файл .env

const settings = {
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV,
  socketStatus: process.env.SOCKETS_IO_STATUS,
  mongoStatus: process.env.MONGO_STATUS,
  mongoUrl: 'mongodb://127.0.0.1/'
}

export default settings
