import { combineReducers } from 'redux'

import message from './message'

const createRootReducers = () => {
  return combineReducers({
    message
  })
}

export default createRootReducers
