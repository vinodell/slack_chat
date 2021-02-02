import React from 'react'

import Channel from './channel'
import Application from './application'
import Direct from './direct'
import ServerBlock from './server-block'
import UserBlock from './user-block'

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-gray-500 w-1/5 pb-6 hidden md:block">
      <ServerBlock />
      <UserBlock />
      <Channel />
      <Direct />
      <Application />
    </div>
  )
}

export default Sidebar
