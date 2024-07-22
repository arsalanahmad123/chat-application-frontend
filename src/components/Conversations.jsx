import { useEffect, useState } from 'react'
import {api} from "../api/api"
import { Link } from 'react-router-dom'
import {socket} from "../socket/socket"
import {useAuth} from "../context/AuthContext"
const Conversations = () => {
    const [conversations, setConversations] = useState([])

    const {loggedIn} = useAuth()

    useEffect(() => {
        const getConversations = async() =>{
            try {
                const response = await api.get('/api/conversations')
                if(response.status===200){
                    setConversations(response.data.data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        getConversations()

        if(loggedIn){
        socket.on('new_conversation', (newConversation) => {
            setConversations(prevConversations => [...prevConversations, newConversation]);
        });

        return () => {
            socket.off('new_conversation');
        }
        }

    }, [])


    return (
        <div className='flex flex-col w-full overflow-y-auto'>
            {
                conversations?.length > 0 && conversations.map((conversation,i) => {
                    return (
                        <Link key={i} className='py-5 font-semibold pl-5 bg-gray-100 dark:bg-slate-800 dark:border-gray-700 border-b border-gray-200 cursor-pointer' to={`/conversation/${conversation.participants[0]._id}`}>
                            {
                                conversation.participants[0].username.toUpperCase()
                            }
                        </Link>
                    )
                })
            }

            {
                conversations.length === 0 && <span className='font-semibold ml-3'>No Chats <br />
                    Select Contact to start chat 
                </span>
            }

        </div>
    )
}

export default Conversations
