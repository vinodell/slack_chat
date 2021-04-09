import passportJWT from 'passport-jwt'

import config from '../config'
import User from '../mongodb/User.models'

// стратегия авторизации, проверка токена jwt без нас

const cookieExtractor = (req) => {
  return req && req.cookies && req.cookies.token // возьми токен из cookie, если нет, то из headers, если и там нет, то из адресной строки
}

const jwtOptions = {
  secretOrKey: config.secret, //   по-хорошему тоже прописывается в config
  jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new passportJWT.Strategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.uid, (err, user) => {
    if (err) {
      return done(err, null) // есть ошибка, а юзер null
    }
    if (user) {
      return (null, user) // ошибка null, но есть user
    }
    return done(null, false)
  })
})

exports.jwt = jwtStrategy
