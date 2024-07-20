import { useState, useEffect, createContext, useContext } from 'react'

export const authContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchUser = async () => {
            const storedData = JSON.parse(localStorage.getItem('user'));
            const expiry = JSON.parse(localStorage.getItem('expiry'))

            if (storedData && expiry) {
                const currentTime = Date.now();
                const timeDifference = currentTime - expiry;

                if (timeDifference > 24 * 60 * 60 * 1000) {
                    localStorage.removeItem('user');
                    setUser(null);
                    setLoggedIn(false);
                } else {
                    setUser(storedData);
                    setLoggedIn(true);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    return (
        <authContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, loading }}>
            {children}
        </authContext.Provider>
    );

}

export const useAuth = () => {
    return useContext(authContext)
}
