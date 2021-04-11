import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { trySignIn, trySecretRoute } from '../redux/reducers/auth'

const Startup = (props) => {
  const dispatch = useDispatch()
  const { token } = useSelector((s) => s.auth)
  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
      dispatch(trySecretRoute())
    }
  }, [])
  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
