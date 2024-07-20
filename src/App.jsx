import './App.css'
import { Routes, Route } from 'react-router-dom'
import Auth from './screens/Auth'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'
import Home from './screens/Home'
import Layout from './components/Layout'
import Conversation from "./screens/Conversation"
import NotFound from './screens/NotFound'
import { useEffect } from 'react'

function App() {
    const { loggedIn,loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>; 
    }


    return (
        <>
            <Toaster position='top-right' />
            <Routes>
                {
                    loggedIn ? (
                        <>
                        <Route
                            path='/'
                            element={
                                    <Layout>
                                        <Home />
                                    </Layout>
                            }
                        /> 
                        <Route 
                            path='/conversation/:slug'
                            element={
                                <Layout>
                                    <Conversation />
                                </Layout>
                            }
                        />
                        <Route 
                            path = "*"
                            element={
                                <Layout>
                                    <NotFound />
                                </Layout>
                            }
                        />
                </>
            ) : 
            <>
                <Route
                    path='/auth'
                    element={<Auth />}
                />
                <Route
                    path='*'
                    element={<Auth />}
                    />
            </>
            }
            </Routes>
        </>
    )
}

export default App
