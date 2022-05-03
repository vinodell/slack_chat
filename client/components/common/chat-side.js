import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setMessage, getMessages, getCurrentMsg } from '../../redux/reducers/message'

// import MainPage from '../main_page'

const Chat = () => {
  const dispatch = useDispatch()
  const { messageHistory, userMessage } = useSelector((s) => s.message)
  const onClick = () => {
    dispatch(setMessage({ name: userMessage.name, text: userMessage }))
    console.log('-------userMessage-----222--', userMessage)
    console.log('-------userMessage-----222--', messageHistory)
    dispatch(getCurrentMsg(''))
  }
  const onChange = (e) => dispatch(getCurrentMsg(e.target.value))
  useEffect(() => {
    dispatch(getMessages())
  }, [dispatch])
  return (
    <div className="w-full flex flex-col bg-gray-600">
      {/* <!-- Top bar --> */}
      <div className="border-b border-gray-800 shadow flex px-6 py-2 items-center">
        <div className="flex flex-col">
          <h3 className="text-gray-100 text-md mb-1 font-bold">#general</h3>
          <div className="text-gray-400 font-thin text-sm">
            Chit-chattin&apos; about ugly HTML and mixing of concerns.
          </div>
        </div>
        <div className="ml-auto hidden md:block">
          <input
            type="search"
            placeholder="Search"
            className="bg-gray-800 border border-gray rounded-lg p-2"
          />
        </div>
      </div>
      {/* <!-- Chat messages --> */}
      <div className="px-6 py-4 flex-1 overflow-scroll-x">
        {/* <!-- A message --> */}
        <div className="flex items-start mb-4">
          <img
            src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4"
            className="w-10 h-10 rounded mr-3"
            alt="user avatar"
          />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold text-md mr-2 font-sans">Vinodel</span>
              <span className="text-gray text-xs font-light">
                {new Date().getHours()}: {new Date().getMinutes()}
              </span>
            </div>
            <p className="font-light text-md text-gray-200 pt-1">The slack from the other side.</p>
          </div>
        </div>
        <div>
          <ul id="messages">
            {messageHistory.map((message, id) => (
              <li key={id}>{`${message.name}:  ${message.text}`}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex m-6 rounded-lg border-2 border-gray overflow-hidden opacity-90 hover:opacity-100">
        <button
          onClick={onClick}
          type="button"
          className="text-2xl text-gray-200 px-4 border-r-2 border-gray focus:outline-none"
        >
          ↑
        </button>
        <input
          type="text"
          className="w-full px-4"
          placeholder="Message to #general"
          id=""
          autoComplete="off"
          value={userMessage}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default Chat
