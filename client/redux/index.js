import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import { io } from 'socket.io-client'

import createRootReducers from './reducers/store'

const initialState = {}
const middleware = [thunk]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composeEchantress = composeFunc(applyMiddleware(...middleware))

const store = createStore(createRootReducers(), initialState, composeEchantress)

// if (SOCKETS_IO_STATUS || false) {
//   // eslint-disable-next-line
//   const socket = io(`${window.location.origin}`, {
//     path: '/ws'
//   })
// }

export default store
