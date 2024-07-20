import React from 'react'
import Input from './Input'
import { useAuth } from "../context/AuthContext"

const Messages = ({messages,chatID,slug}) => {

    const {user} = useAuth()


    return (
        <section className='relative min-h-screen mt-10'>
            <div className='flex flex-col px-4 gap-y-2'>
                {
                    messages?.map((message,i)=> (
                        <div className={`chat ${message.sender === user?._id ? 'chat-end' : 'chat-start'}`} key={i}>
                            <div className={`chat-bubble ${chatID === user?._id ? 'bg-blue-400' : 'bg-gray-600'} shadow-lg text-white text-lightblue `}>
                                {message.message}
                            </div>
                        </div>
                    ))
                }
                {/* <div className='chat chat-end'>
                    <div className='chat-bubble bg-slate-700 shadow-lg text-white text-secondary'>
                        Put me on the Council and not make me a Master!??
                    </div>
                </div> */}
            </div>

            <div className=' w-[70%] fixed bottom-0 right-0 -translate-y-2 -translate-x-20 p-2 flex justify-center items-center backdrop-blur-xl '>
                <Input chatID={chatID} conversationID={slug} />
            </div>
        </section>
    )
}

export default Messages
