import React from 'react'

import { IoMdSend as SendIcon } from 'react-icons/io'

const Input = () => {
    return (
        <>
            <div className='w-3/4 relative  shadow-2xl shadow-black backdrop-blur-lg'>
                <input
                    type='text'
                    className='bg-accent  p-2 rounded-md text-gray-950 focus:ring-0 focus:border-0 focus:outline-none  shadow-2xl shadow-neutral placeholder:text-gray-700 w-full'
                    placeholder='Message'
                />
                <div className='absolute top-0 right-0 bg-secondary h-full w-auto px-4 py-1 flex justify-center items-center rounded-tr-md rounded-br-md hover:cursor-pointer hover:bg-accent text-white hover:text-gray-950 border-l border-white transition-all duration-300 ease-in'>
                    <SendIcon />
                </div>
            </div>
        </>
    )
}

export default Input
