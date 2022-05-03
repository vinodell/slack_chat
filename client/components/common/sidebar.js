import React from 'react'

import Channel from '../mini_comp/channel'
import Application from '../mini_comp/application'
import ServerBlock from '../mini_comp/server-block'
import UserBlock from '../mini_comp/user-block'

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-gray-500 w-1/5 pb-6 hidden md:block">
      <ServerBlock />
      <UserBlock />
      <Channel />
      <Application />
    </div>
  )
}

export default Sidebar
