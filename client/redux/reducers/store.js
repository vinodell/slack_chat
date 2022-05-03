import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import message from './message'
import auth from './auth'

const createRootReducers = (history) => {
  return combineReducers({
    router: connectRouter(history),
    message,
    auth
  })
}

export default createRootReducers
