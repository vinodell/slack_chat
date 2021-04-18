import io from 'socket.io-client'

const GET_MESSAGES = 'GET_MESSAGES'
const SET_MESSAGE = 'SET_MESSAGE'
const CURRENT_MESSAGE = 'CURRENT_MESSAGE'

const initialState = {
  messageHistory: [],
  userMessage: '',
  currentRoom: 'general'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
    case SET_MESSAGE: {
      return {
        ...state,
        messageHistory: action.msgHistory
      }
    }
    case CURRENT_MESSAGE: {
      return {
        ...state,
        userMessage: action.msg
      }
    }
    default:
      return state
  }
}

let socket
if (SOCKETS_IO_STATUS || false) {
  // eslint-disable-next-line
  socket = io(`${window.location.origin}`, {
    path: '/ws'
  })
}

export function setMessage(msg) {
  return (dispatch) => {
    socket.emit('newMessage', msg)
    socket.on('messageHistory', (arg) => {
      dispatch({
        type: SET_MESSAGE,
        msgHistory: arg
      })
    })
  }
}

export function getMessages() {
  return (dispatch) => {
    socket.on('messageHistory', (arg) => {
      dispatch({
        type: GET_MESSAGES,
        msgHistory: arg
      })
    })
  }
}

export function getCurrentMsg(msg) {
  return {
    type: CURRENT_MESSAGE,
    msg
  }
}
