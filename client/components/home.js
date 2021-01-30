import React from 'react'

import Sidebar from './sidebar'
import Chat from './chat'

const Home = () => {
  return (
    <div>
      <div className="w-full border shadow bg-white">
        <div className="flex">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default Home
