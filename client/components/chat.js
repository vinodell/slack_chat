import React from 'react'

const Chat = () => {
  return (
    <div className="w-full flex flex-col">
      {/* <!-- Top bar --> */}
      <div className="border-b flex px-6 py-2 items-center">
        <div className="flex flex-col">
          <h3 className="text-gray-600 text-md mb-1 font-extrabold">#general</h3>
          <div className="text-grey font-thin text-sm">
            Chit-chattin&apos; about ugly HTML and mixing of concerns.
          </div>
        </div>
        <div className="ml-auto hidden md:block">
          <input type="search" placeholder="Search" className="border border-grey rounded-lg p-2" />
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
              <span className="font-bold text-md mr-2 font-sans">killgt</span>
              <span className="text-grey text-xs font-light">11:46</span>
            </div>
            <p className="font-light text-md text-gray-600 pt-1">
              The slack from the other side.
            </p>
          </div>
        </div>

        {/* <!-- A message --> */}
        <div className="flex items-start mb-4">
          <img
            src="https://i.imgur.com/8Km9tLL.jpg"
            className="w-10 h-10 rounded mr-3"
            alt="user avatar"
          />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold text-md mr-2 font-sans">Olivia Dunham</span>
              <span className="text-grey text-xs font-light">12:45</span>
            </div>
            <p className="font-light text-md text-gray-600 pt-1">
              How are we supposed to control the marquee space without an utility for it? I propose
              this:
            </p>
            <div
              id="program_code"
              className="bg-grey-lighter border border-grey-light font-mono rounded p-3 mt-2 whitespace-pre"
            >
              {`.marquee-lightspeed {-webkit-marquee-speed: fast}; .marquee-lightspeeder
                    {-webkit-marquee-speed: faster};`}
            </div>
          </div>
        </div>

        {/* <!-- A message --> */}
        <div className="flex items-start">
          <img
            src="https://i.imgur.com/qACoKgY.jpg"
            className="w-10 h-10 rounded mr-3"
            alt="user avatar"
          />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold text-md mr-2 font-sans">Adam Bishop</span>
              <span className="text-grey text-xs font-light">12:46</span>
            </div>
            <p className="font-light text-md text-gray-600 pt-1">
              <a href="#" className="text-blue">
                @Olivia Dunham
              </a>{' '}
              the size of the generated CSS is creating a singularity in space/time, we must stop
              adding more utilities before it&apos;s too late!
            </p>
          </div>
        </div>
      </div>
      <div className="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
        <span className="text-3xl text-grey px-3 border-r-2 border-grey">+</span>
        <input type="text" className="w-full px-4" placeholder="Message to #general" />
      </div>
    </div>
  )
}

export default Chat
