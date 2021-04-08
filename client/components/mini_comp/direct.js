import React from 'react'

const Direct = () => {
  return (
    <div>
      <div className="px-4 mb-3 font-sans font-bold">Direct Messages</div>

      <div className="flex items-center mb-3 px-4">
        <span className="bg-yellow-400 rounded-full block w-2 h-2 mr-2">&#8194;</span>
        <span className="text-purple-lightest">
          Olivia Dunham <i className="text-gray-100 text-sm">(me)</i>
        </span>
      </div>

      <div className="flex items-center mb-3 px-4">
        <span className="bg-yellow-400 rounded-full block w-2 h-2 mr-2">&#8194;</span>
        <span className="text-purple-lightest">Adam Bishop</span>
      </div>

      <div className="flex items-center px-4 mb-6">
        <span className="border rounded-full block w-2 h-2 mr-2">&#8194;</span>
        <span className="text-purple-lightest">killgt</span>
      </div>
    </div>
  )
}

export default Direct
