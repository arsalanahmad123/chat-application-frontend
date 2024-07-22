import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { api } from '../api/api'
import toast from 'react-hot-toast'
import { FaDeleteLeft as DeleteIcon } from 'react-icons/fa6'
import { IoPersonAddOutline as AddIcon } from "react-icons/io5";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const Loader = () => {
    return(
        <span className="loading loading-dots loading-xs"></span>
    )
}



function ContactModal({setIsOpen,getContacts}) {
    const [email, setEmail] = useState('')
    const [loading,setLoading] = useState(false)

    const createContact = async () => {
        try {
            setLoading(true)
            if (email === '') {
                toast.error(
                    'Please enter valid email address to add as a contact',
                )
                setLoading(false)
                return
            }
            const response = await api.post('/api/users/addcontact', {
                email,
            })

            if (response.status === 200) {
                toast.success('Contact added successfully')
                getContacts()
                setEmail('')
                setLoading(false)
                setIsOpen(false)
            }
        } catch (error) {
            toast.error(error.response.data.error)
            console.log(error)
            setLoading(false)
        }
    }

    return createPortal(
         <div className='py-5 px-6 fixed bg-gray-900 shadow-2xl shadow-gray-700  top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] min-w-[500px]'>
            <div className='flex flex-col'>
                    <h3 className='text-3xl font-semibold text-gray-400 mb-4'>
                        Add Contact
                    </h3>
                    <div className='my-5 grid grid-cols-5 gap-4'>
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter valid Contact Email Address'
                            className='bg-slate-800 border border-slate-700 p-2 ring-0 outline-none focus:outline-none focus:ring-0 col-span-4'
                        />
                        <button
                            onClick={createContact}
                            className='bg-gray-900 px-4 py-2 border border-gray-500 flex justify-center items-center'
                            disabled={loading}
                        >
                            {loading ? <Loader /> : 'Add'}
                        </button>
                </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className='mt-auto text-lg px-2 py-1 bg-gray-700 text-white rounded ml-auto'
                    >
                        Close
                    </button>
                    </div>
                </div>,
                document.getElementById('modal')
    )
}


const Contacts = () => {
    const [contacts, setContacts] = useState([])
    const [isOpen,setIsOpen] = useState(false)

    useEffect(() => {
        getContacts()
    },[])


    const variants = {
        hidden: { opacity: 0},
        visible: { opacity: 1},
        enter: { x: -5, transition: { duration: 0.3 } },
        exit: { x: -5, transition: { duration: 0.3 } },
        };


    const getContacts = async () => {
        try {
            const response = await api.get('/api/users/contacts')
            if (response.status === 200) {
                setContacts(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const deleteContact = async (id) => {
        try {
            const confirmDelete = confirm(
                'Are you sure you want to remove this contact',
            )
            if (!confirmDelete) return
            const response = await api.delete(`/api/users/deletecontact/${id}`)

            if (response.status === 200) {
                toast.success('Contact deleted successfully')
                getContacts()
            }
        } catch (error) {
            toast.error(error.response.data.error)
            console.log(error)
        }
    }


    return (
        <div className='flex justify-start flex-col items-start gap-2'>
                    <div className='flex justify-center items-center p-5 bg-slate-800 ml-auto mr-4 hover:bg-slate-700 border-2 border-gray-700 hover:border-gray-900 cursor-pointer' onClick={() => setIsOpen(true)}>
                        <AddIcon size={22} />
                    </div>
                    <div className='p-4 flex dark:bg-slate-800 w-full'>
                        {contacts.map((contact) => (
                            <div
                                className='w-full bg-slate-700 backdrop-filter backdrop-blur-lg rounded-md p-1 dark:text-white group '
                                key={contact._id}
                            >
                                <Link to={`/conversation/${contact._id}`}>
                                <motion.div className='grid grid-cols-5 p-2 hover:cursor-pointer'
                                    variants={variants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="enter"
                                    whileTap="exit"
                                >
                                    <img
                                        src={contact.avatar}
                                        alt={contact.name}
                                        className='w-10 h-10 rounded-full col-span-2'
                                    />
                                    <div className='col-span-2'>
                                        <h3 className='text-[14px] font-semibold'>
                                            {contact.username}
                                        </h3>
                                        <p className='text-xs'>
                                            {contact.email}
                                        </p>
                                    </div>
                                    <div
                                    className='flex justify-center items-center'
                                    
                                    >
                                    <DeleteIcon
                                        size={20}
                                        onClick={() =>
                                            deleteContact(contact._id)
                                        }
                                        className='cursor-pointer text-red-500 hidden group-hover:block'
                                        
                                        
                                    />
                                    </div>
                                </motion.div>
                                </Link>
                            </div>
                        ))}
                        {contacts.length === 0 && (
                            <span className='font-semibold'>No Contacts </span>
                        )}

                        {isOpen && <ContactModal setIsOpen={setIsOpen} getContacts={getContacts} />}

                    </div>
        </div>
    )
}

export default Contacts
