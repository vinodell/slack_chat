import Cookies from 'universal-cookie'

import { history } from '..'

// import { data } from 'autoprefixer'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'

const cookie = new Cookies()
const initialState = {
  email: '',
  password: '',
  token: cookie.get('token'), // если есть  cookie  с токеном, то она автоматически заполнится, если нет - пустая строка
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN: {
      return { ...state, email: action.email }
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

export function updateLogIn(email) {
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
        history.push('/private')
      })
  }
}

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
        history.push('/private')
      })
  }
}
