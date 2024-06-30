import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { api } from '../api/api'
import toast from 'react-hot-toast'
import { FaDeleteLeft as DeleteIcon } from 'react-icons/fa6'

const ContactModal = ({ isOpen, onClose }) => {
    const [contacts, setContacts] = useState([])
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (isOpen) {
            getContacts()
        }
    }, [isOpen])

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

    const createContact = async () => {
        try {
            if (email === '') {
                toast.error(
                    'Please enter valid email address to add as a contact',
                )
                return
            }
            const response = await api.post('/api/users/addcontact', {
                email,
            })

            if (response.status === 200) {
                toast.success('Contact added successfully')
                getContacts()
            }
        } catch (error) {
            toast.error(error.response.data.error)
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

    if (!isOpen) return null

    return createPortal(
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-8 rounded shadow-lg flex flex-row justify-between max-w-[700px] gap-5'>
                <div>
                    <h2 className='text-xl mb-2 text-gray-900 font-semibold'>
                        Contacts
                    </h2>
                    <div className='w-[300px] bg-gray-200 p-2 max-h-[500px] overflow-auto mt-4'>
                        {contacts.map((contact) => (
                            <div
                                className='w-full bg-gray-100 backdrop-filter backdrop-blur-lg'
                                key={contact._id}
                            >
                                <div className='flex justify-between items-center p-2'>
                                    <img
                                        src={contact.avatar}
                                        alt={contact.name}
                                        className='w-10 h-10 rounded-full'
                                    />
                                    <div className='ml-4'>
                                        <h3 className='text-[14px] font-semibold'>
                                            {contact.username}
                                        </h3>
                                        <p className='text-gray-600 text-xs'>
                                            {contact.email}
                                        </p>
                                    </div>
                                    <DeleteIcon
                                        size={20}
                                        onClick={() =>
                                            deleteContact(contact._id)
                                        }
                                        className='cursor-pointer text-red-500'
                                    />
                                </div>
                            </div>
                        ))}
                        {contacts.length === 0 && (
                            <span className='text-sm'>No Contacts </span>
                        )}
                    </div>
                </div>
                <div className='flex flex-col w-[400px]'>
                    <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                        Add Contact
                    </h3>
                    <div className='join mb-7'>
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter valid Contact Email Address'
                            className='text-sm input input-bordered input-sm join-item ring-0 outline-none focus:outline-none focus:ring-0'
                        />
                        <button
                            onClick={createContact}
                            className='btn btn-sm rounded-r-full join-item'
                        >
                            Add
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className='mt-auto px-2 py-1 text-sm bg-accent text-white rounded ml-auto'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal'),
    )
}

export default ContactModal
