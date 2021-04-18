import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'

import createRootReducers from './reducers/store'
import createHistory from './history'
// import socketMiddleware from './sockets/socket'

export const history = createHistory()

const initialState = {}
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composeEchantress = composeFunc(applyMiddleware(...middleware))

const store = createStore(createRootReducers(history), initialState, composeEchantress)

export default store
