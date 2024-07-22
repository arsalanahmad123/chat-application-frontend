import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {api} from "../api/api"
import ChatHeader from "../components/ChatHeader"
import Messages from '../components/Messages'
import {socket} from "../socket/socket"
import {useAuth} from "../context/AuthContext"



const Conversation = () => {
    const {slug} = useParams()
    const [messages,setMessages] = useState([])
    const [chatUser,setChatUser] = useState({
        _id: '',
        username: '',
        email: ''
    })

    const {loggedIn} = useAuth()

    if(loggedIn){

        socket.on('connect', () => {
        console.log('Connected to server');
        });
        
        socket.on('disconnect', () => {
        console.log('Disconnected from server');
        });

    }

    const getConversation = async() => {
      try {
        const response = await  api.get(`/api/conversations/${slug}`)

        if(response.status===200){
          const data = response.data?.data
          setMessages(data.messages)
          const users = data.participants[0]
          setChatUser(users)

        }
        if(response.status===202){
            setChatUser(response.data.user)
        }

      } catch (error) {
        console.log(error)
      }
    }
    
useEffect(() => {
    getConversation()

    if(loggedIn){
        socket.on('new_message', (newMessage) => {
            setMessages(prevMessages => [...prevMessages, newMessage])
            console.log("Message event received")
        })

        socket.emit('join', slug.toString())

        // Clean up the effect
        return () => {
            socket.off('new_message')
            socket.emit('leave', slug)
        }
    }
}, [slug])





  return (
    <div className='flex flex-col pb-24'>
      <ChatHeader username={chatUser.username} email={chatUser.email} /> 
      <Messages messages={messages} chatID={chatUser._id} />
    </div>
  )
}

export default Conversation