import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setMessage, getMessages, getCurrentMsg } from '../redux/reducers/message'

const MainPage = () => {
  const dispatch = useDispatch()
  const { messageHistory, userMessage } = useSelector((s) => s.message)
  const onClick = () => {
    return () => {
      dispatch(setMessage({ name: 'Max', text: userMessage }))
      dispatch(getCurrentMsg(''))
    }
  }
  const onChange = (e) => dispatch(getCurrentMsg(e.target.value))
  useEffect(() => {
    dispatch(getMessages())
  }, [dispatch])

  return (
    <div>
      <ul id="messages">
        {messageHistory.map((message, id) => (
          <li key={id}>{`${message.name}:  ${message.text}`}</li>
        ))}
      </ul>
      <form action="">
        <input id="" autoComplete="off" onChange={onChange} value={userMessage} />
        <button type="button" onClick={onClick()}>
          Send
        </button>
      </form>
    </div>
  )
}

export default MainPage
