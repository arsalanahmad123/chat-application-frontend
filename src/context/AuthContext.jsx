import { useState, useEffect, createContext, useContext } from 'react'

export const authContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'))

            if (storedUser) {
                setUser(storedUser)
                setLoggedIn(true)
            }
        }
        fetchUser()
    }, [])

    return (
        <authContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}
