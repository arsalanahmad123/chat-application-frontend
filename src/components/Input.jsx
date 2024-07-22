import React, { useState } from 'react'
import { IoMdSend as SendIcon } from 'react-icons/io'
import { api } from '../api/api'
import toast from 'react-hot-toast'
import { socket } from '../socket/socket'


const Input = ({chatID,conversationID}) => {
    const [message,setMessage] = useState('')

    const sendMessage = async() => {
        try {
            if(message===''){
                toast.error("Can't send empty message")
                return 
            }


            const response = conversationID ? await api.post('/api/conversations/send',{
                receiverId: chatID,
                message,
                conversationID
            }) : api.post('/api/conversations/send',{
                receiverId: chatID,
                message,
            })

            
            if(response.status===201){
                socket.emit('newMessage',response.data)
                setMessage('')
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to send message.");
            setMessage('')
        }

        
    }

    return (
        <>
            <div className='w-3/4 relative  shadow-2xl shadow-black backdrop-blur-lg'>
                <input
                    type='text'
                    className='bg-white p-5 rounded-md text-gray-950 focus:ring-0 focus:border-0 focus:outline-none  shadow-2xl shadow-neutral placeholder:text-gray-700 w-full'
                    placeholder='Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
                />
                <div className='absolute top-0 right-0 bg-white text-slate-800 h-full w-auto px-4 py-1 flex justify-center items-center rounded-tr-md rounded-br-md hover:cursor-pointer hover:bg-slate-700 hover:text-white border-l border-slate-950 text-2xl' onClick={sendMessage}>
                    <SendIcon />
                </div>
            </div>
        </>
    )
}

export default Input
