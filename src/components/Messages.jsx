import {useState,useEffect} from 'react'
import Input from './Input'
import { useAuth } from "../context/AuthContext"
import {  motion } from 'framer-motion';



const Messages = ({messages,chatID}) => {

    const {user} = useAuth()
     const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const scrollToBottom = () => {
            const element = document.getElementById(`message-${messages.length - 1}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        scrollToBottom();

        setCurrentMessageIndex(0);
    }, [messages]);
    


    return (
        <section className='relative mt-10 overflow-y-auto'>
            <div className='flex flex-col px-4 gap-y-2'>
                {
                    messages?.map((message,i)=> (
                        <motion.div 
                            className={`chat ${message.sender === user?._id ? 'chat-end' : 'chat-start mt-2'}`} 
                            id={`message-${i}`} 
                            key={i}
                            >
                            <motion.div 
                                className={`chat-bubble ${chatID === user?._id ? 'bg-blue-400' : 'bg-gray-600'} shadow-lg text-white text-lightblue `}
                                initial={{opacity: 0, y:10}}
                                animate={{opacity:1,y:0}}
                                >
                                {message.message}
                            </motion.div>
                        </motion.div>
                    ))
                }
            </div>

            <div className=' w-[70%] fixed bottom-0 right-0 -translate-y-2 -translate-x-20 p-2 flex justify-center items-center backdrop-blur-xl '>
                <Input chatID={chatID} conversationID={messages[0]?.conversationID} />
            </div>
        </section>
    )
}

export default Messages
