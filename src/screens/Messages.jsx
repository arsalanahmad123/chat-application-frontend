import React from 'react'
import Input from '../components/Input'

const Messages = () => {
    return (
        <section className='relative min-h-screen '>
            <h1 className='text-2xl font-semibold mb-4 p-5 border-b border-gray-500 w-full sticky top-0 bg-white z-50 text-secondary'>
                Contact Name
            </h1>
            <div className='flex flex-col px-4 gap-y-2'>
                <div className='chat chat-start'>
                    <div className='chat-bubble chat-bubble-lightblue text-lightblue'>
                        Put me on the Council and not make me a Master!??
                    </div>
                </div>
                <div className='chat chat-end'>
                    <div className='chat-bubble chat-bubble-info text-secondary'>
                        Put me on the Council and not make me a Master!??
                    </div>
                </div>
            </div>

            <div className='w-[90%] fixed bottom-0 right-0 p-2 flex justify-center items-center backdrop-blur-xl  bg-white'>
                <Input />
            </div>
        </section>
    )
}

export default Messages
