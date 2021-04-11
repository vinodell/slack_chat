import passport from 'passport'

const handleJWT = (req, res, next, roles) => {
  return async (err, user, info) => {
    const error = err || info
    if (error || !user) {
      return res.status(401).json({ status_user: user, status_err: error })
    }
    req.logIn(user, { session: false })
    console.log(user, user.role)

    if (!roles.reduce((acc, rec) => acc && user.role.some((it) => it === rec), true)) {
      return res.status(401).json({ status: roles })
    }
    req.user = user
    return next()
  }
}

const rights = (roles = []) => (req, res, next) => {
  return passport.authenticate(
    'jwt',
    {
      session: false
    },
    handleJWT(req, res, next, roles)
  )(req, res, next)
}

export default rights
