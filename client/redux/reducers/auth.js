import Cookies from 'universal-cookie'

import { history } from '..'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_NAME = 'UPDATE_NAME'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const USER_REGISTRATION = 'USER_REGISTRATION'
const LOGIN = 'LOGIN'

const cookie = new Cookies()
const initialState = {
  name: '',
  email: '',
  password: '',
  token: cookie.get('token'), // если есть  cookie  с токеном, то она автоматически заполнится, если нет - пустая строка
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAME: {
      return { ...state, name: action.name }
    }
    case UPDATE_LOGIN: {
      return { ...state, email: action.email }
    }
    case USER_REGISTRATION: {
      return {
        ...state,
        name: action.name,
        email: action.email,
        password: ''
      }
    }
    case LOGIN: {
      return {
        ...state,
        token: action.token,
        password: '',
        user: action.user
      } // нет смысла хранить пароль в state после логирования
    }
    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
    }
    default:
      return state
  }
}

export function updateName(name) {
  return {
    type: UPDATE_LOGIN,
    name
  }
}

export function updateEmail(email) {
  return {
    type: UPDATE_LOGIN,
    email
  }
}

export function updatePassword(password) {
  return {
    type: UPDATE_PASSWORD,
    password
  }
}

export function trySignIn() {
  return (dispatch) => {
    fetch('/api/v1/auth')
      .then((it) => it.json())
      .then((data) => {
        dispatch({
          type: LOGIN,
          token: data.token,
          user: data.user
        })
        history.push('/home')
      })
  }
}

// секретный route
// export function trySecretRoute() {
//   return () => {
//     fetch('/api/v1/user-info')
//       .then((it) => it.json())
//       .then((data) => {
//         console.log(data)
//       })
//   }
// }

export function signIn() {
  return (dispatch, getState) => {
    const { email, password } = getState().auth
    fetch('/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((it) => it.json())
      .then((data) => {
        dispatch({
          type: LOGIN,
          token: data.token,
          user: data.user
        })
        history.push('/home')
      })
  }
}

export function userRegistration(name, email, password) {
  return (dispatch) => {
    fetch('/api/v1/new_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name,
        password
      })
    })
      .then((it) => it.json())
      .then((data) => {
        dispatch({
          type: USER_REGISTRATION,
          name: data.name,
          email: data.email,
          password: data.password
        })
        history.push('/login')
      })
  }
}
