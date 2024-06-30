import React, { useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { IoPeople, IoSettingsOutline } from 'react-icons/io5'
import { IoMdExit } from 'react-icons/io'
import { api } from '../api/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { MdPermContactCalendar as ContactIcon } from 'react-icons/md'
import ContactModal from '../components/ContactModal'
import Conversations from './Conversations'

const Nav = () => {
    const { setLoggedIn, setUser } = useAuth()
    const [activeSection, setActiveSection] = useState('chats')
    const navigate = useNavigate()
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    const handleLogout = async () => {
        try {
            const response = await api.post('/api/auth/logout')
            if (response.status === 200) {
                setLoggedIn(false)
                setUser(null)
                localStorage.removeItem('user')
                navigate('/auth')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'chats':
                return <Conversations />
            case 'profile':
                return (
                    <div className='flex flex-col w-full'>
                        <h3 className='py-3 px-1 bg-gray-100 border-b border-gray-200 cursor-pointer'>
                            Profile Section
                        </h3>
                        {/* Add more profile-related content here */}
                    </div>
                )
            case 'settings':
                return (
                    <div className='flex flex-col w-full'>
                        <h3 className='py-3 px-1 bg-gray-100 border-b border-gray-200 cursor-pointer'>
                            Settings Section
                        </h3>
                        {/* Add more settings-related content here */}
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className='flex flex-row min-h-screen w-full border-r justify-start'>
            <div className='flex flex-col justify-start gap-y-2 bg-gray-200 p-3'>
                <button
                    onClick={() => setActiveSection('chats')}
                    className={`p-4 rounded-full ${
                        activeSection === 'chats' && 'bg-gray-300'
                    }`}
                >
                    <FaHome size={20} />
                </button>
                <button
                    onClick={() => setActiveSection('profile')}
                    className={`p-4 rounded-full ${
                        activeSection === 'profile' && 'bg-gray-300'
                    }`}
                >
                    <IoPeople size={20} />
                </button>
                <button
                    className='p-4 rounded-full'
                    onClick={() => setIsContactModalOpen(true)}
                >
                    <ContactIcon size={20} />
                </button>
                <button
                    onClick={() => setActiveSection('settings')}
                    className={`p-4 rounded-full ${
                        activeSection === 'settings' && 'bg-gray-300'
                    }`}
                >
                    <IoSettingsOutline size={20} />
                </button>
                <button
                    className='p-4 rounded-full hover:bg-red-500 transition-all duration-150 ease-in hover:text-white'
                    onClick={handleLogout}
                >
                    <IoMdExit size={20} />
                </button>
            </div>
            <div className='flex flex-col gap-y-10 mt-10 w-full'>
                <h2 className='font-bold text-2xl text-center'>
                    {activeSection.charAt(0).toUpperCase() +
                        activeSection.slice(1)}
                </h2>
                {renderContent()}
            </div>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </div>
    )
}

export default Nav
