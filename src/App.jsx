import './App.css'
import { Routes, Route } from 'react-router-dom'
import Auth from './screens/Auth'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'
import Home from './screens/Home'
import { Navigate } from 'react-router-dom'
import Layout from './components/Layout'

function App() {
    const { loggedIn } = useAuth()

    return (
        <>
            <Toaster position='top-right' />
            <Routes>
                <Route
                    path='/'
                    element={
                        loggedIn ? (
                            <Layout>
                                <Home />
                            </Layout>
                        ) : (
                            <Navigate to='/auth' />
                        )
                    }
                />
                <Route
                    path='/auth'
                    element={loggedIn ? <Navigate to='/' /> : <Auth />}
                />
            </Routes>
        </>
    )
}

export default App
