import React from 'react'
import Sidebar from './common/sidebar'
import Chat from './common/chat-side'

const Home = () => {
  return (
    <div className="h-screen overflow-hidden flex justify-center">
      <Sidebar />
      <Chat />
    </div>
  )
}

export default Home
