import { useEffect, useState } from 'react'
const Conversations = () => {
    const [conversations, setConversations] = useState([])

    useEffect(() => {}, [])

    return (
        <div className='flex flex-col w-full'>
            <span className='py-3 px-1 bg-gray-100 border-b border-gray-200 cursor-pointer'>
                Chat1
            </span>
            <span className='py-3 px-1 bg-gray-100 border-b border-gray-200 cursor-pointer'>
                Chat2
            </span>
            <span className='py-3 px-1 bg-gray-100 border-b border-gray-200 cursor-pointer'>
                Chat3
            </span>
            <span className='py-3 px-1 bg-gray-100 border-b border-gray-200 cursor-pointer'>
                Chat4
            </span>
        </div>
    )
}

export default Conversations
