import { combineReducers } from 'redux'

import message from './message'
import auth from './auth'

const createRootReducers = () => {
  return combineReducers({
    message,
    auth
  })
}

export default createRootReducers
