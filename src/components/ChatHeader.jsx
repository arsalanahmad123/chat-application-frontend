import React from 'react'

const ChatHeader = ({username,email}) => {
  return (
    <div className='flex justify-between items-center bg-slate-700 shadow py-4 m-2 rounded-lg px-10'>
        <span className='text-2xl font-semibold'>{username.toUpperCase()}</span>
        <span className='text-lg font-medium'>{email}</span>
    </div>
  )
}

export default ChatHeader