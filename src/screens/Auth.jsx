import React, { useState } from 'react'
import { api } from '../api/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { setLoggedIn, setUser } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            toast.error('Please fill in all fields')
            return
        }
        try {
            const response = await api.post('/api/auth/login', {
                email,
                password,
            })

            if (response.status === 200) {
                toast.success('Login Successful')
                setLoggedIn(true)
                setUser(response.data)
                localStorage.setItem('user', JSON.stringify(response.data))
                navigate('/')
            }
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    return (
        <form className='flex flex-col items-center justify-center p-10 fadeIn'>
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full max-w-sm p-2 mb-4 rounded-md bg-primary text-gray-700 focus:outline-none ring-1 ring-accent focus:ring focus:ring-accent'
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full max-w-sm p-2 mb-4 rounded-md bg-primary text-gray-700 focus:outline-none ring-1 ring-accent focus:ring focus:ring-accent'
            />
            <button
                type='submit'
                onClick={handleSubmit}
                className='w-full max-w-xs p-2 rounded-md bg-accent text-primary font-semibold focus:outline-none focus:ring-0 mt-5'
            >
                Login
            </button>
        </form>
    )
}

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (
            email === '' ||
            password === '' ||
            username === '' ||
            gender === ''
        ) {
            toast.error('Please fill in all fields')
            return
        }
        try {
            const response = await api.post('/api/auth/signup', {
                username,
                email,
                password,
                gender,
            })

            if (response.status === 201) {
                toast.success('Registration Successful')
                setLoggedIn(true)
                setUser(response.data)
                localStorage.setItem('user', JSON.stringify(response.data))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    return (
        <form className='flex flex-col items-center justify-center p-10 fadeIn'>
            <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full max-w-sm p-2 mb-4 rounded-md bg-primary text-gray-700 focus:outline-none ring-1 ring-accent focus:ring focus:ring-accent'
            />
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full max-w-sm p-2 mb-4 rounded-md bg-primary text-gray-700 focus:outline-none ring-1 ring-accent focus:ring focus:ring-accent'
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full max-w-sm p-2 mb-4 rounded-md bg-primary text-gray-700 focus:outline-none ring-1 ring-accent focus:ring focus:ring-accent'
            />
            <div className='flex items-center mb-4'>
                <label className='mr-2'>Gender:</label>
                <input
                    type='radio'
                    id='male'
                    name='gender'
                    value='male'
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                    className='mr-1 radio radio-accent radio-sm'
                />
                <label htmlFor='male' className='mr-4'>
                    Male
                </label>
                <input
                    type='radio'
                    id='female'
                    name='gender'
                    value='female'
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                    className='mr-1 radio radio-accent radio-sm'
                />
                <label htmlFor='female'>Female</label>
            </div>
            <button
                type='submit'
                onClick={handleSubmit}
                className='w-full max-w-xs p-2 rounded-md bg-accent text-primary font-semibold focus:outline-none focus:ring-0 mt-5'
            >
                Sign Up
            </button>
        </form>
    )
}

const Auth = () => {
    const [login, setLogin] = useState(true)
    return (
        <div
            className='flex justify-center items-center h-screen  gap-y-5  max-w-full'
            id='auth-page'
        >
            <div className='flex flex-col gap-y-5 shadow-2xl min-h-[450px] p-6 bg-primary/50 backdrop-blur-lg'>
                <div className='flex justify-center items-center gap-x-2'>
                    <span
                        className={`font-semibold text-xl text-secondary w-20 p-1 cursor-pointer  ${
                            login ? 'border-b-2 border-accent ' : ''
                        }`}
                        onClick={() => setLogin(true)}
                    >
                        Login
                    </span>
                    <span
                        className={`font-semibold text-xl text-secondary w-20 p-1 cursor-pointer  ${
                            !login ? 'border-b-2 border-accent' : ''
                        }`}
                        onClick={() => setLogin(false)}
                    >
                        Register
                    </span>
                </div>
                {login ? <Login /> : <Register />}
            </div>
        </div>
    )
}

export default Auth
