import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateLogIn, updatePassword, signIn } from '../redux/reducers/auth'

const Login = () => {
  const dispatch = useDispatch()
  const { login, password } = useSelector((s) => s.auth)
  return (
    <div className="w-screen h-screen bg-gray-300 font-sans login bg-cover">
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            <form className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
              <p className="text-gray-600 font-medium text-center text-lg font-bold">LOGIN</p>
              <div className="">
                <label className="block text-sm text-gray-600" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                  type="email"
                  id="email"
                  placeholder="enter your e-mail"
                  value={login}
                  onChange={(e) => dispatch(updateLogIn(e.target.value))}
                />
                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                    type="password"
                    id="password"
                    placeholder="enter your psw"
                    value={password}
                    onChange={(e) => dispatch(updatePassword(e.target.value))}
                  />
                  <div className="mt-4 items-center flex justify-between">
                    <button
                      className="px-4 py-1 text-gray-600 font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                      type="submit"
                      onClick={() => { dispatch(signIn()) }}
                    >
                      Log_IN
                    </button>
                    <a
                      className="inline-block right-0 align-baseline font-bold text-sm text-500 text-gray-600 hover:text-red-400"
                      href="#"
                    >
                      forgot password?
                    </a>
                  </div>
                  <div className="text-center">
                    <a className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                      Registration
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
