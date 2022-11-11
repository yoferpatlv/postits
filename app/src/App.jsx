// const { useState } = React
import { useState } from 'react'
import Feedback from './components/Feedback'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import Loggito from './utils/Loggito'
import Context from './utils/Context'
import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useEffect } from 'react'


function App() {
    const logger = new Loggito('App')

    // const [view, navigate] = useState(sessionStorage.token ? 'home' : 'login')
    const navigate = useNavigate()

    const [feedback, setFeedback] = useState({ message: null, level: null })
    const [theme, setTheme] = useState("dark")

    const handleNavigationToRegister = () => {
        navigate('register')

        logger.debug('navigate to register')
    }

    const handleNavigationToLogin = () => {
        navigate('login')

        logger.debug('navigate to login')
    }

    const handleNavigationToHome = () => {
        navigate('/')

        logger.debug('navigate to home')
    }

    const handleLogoutClick = () => {
        delete sessionStorage.token

        handleNavigationToLogin()
    }

    const handleAcceptFeedback = () => {
        const feedback = { message: null, level: null }

        setFeedback(feedback)

        logger.debug('setFeedback', feedback)
    }

    const handleFeedback = feedback => {
        setFeedback(feedback)

        logger.debug('setFeedback', feedback)
    }

    const toggleTheme = () => {
        { document.documentElement.classList.toggle('light') }
        if (theme === "light") setTheme("dark")
        else setTheme("light")
    }

    logger.info('return')
    //
    return <Context.Provider value={{ handleFeedback, toggleTheme, theme }}>
        <div className="App container container--full">
            <Routes>

                <Route path="login" element={sessionStorage.token ? <Navigate to="/" /> : <LoginPage onLinkClick={handleNavigationToRegister} onLogIn={handleNavigationToHome} />} />

                <Route path='register' element={sessionStorage.token ? <Navigate to="/" /> : <RegisterPage onLinkClick={handleNavigationToLogin} onSingUp={handleNavigationToLogin} />} />

                {/* coloco dentro de path "/" que es direcccion al home y le agrego "*"" para que acepte a todos los hijos de home */}

                <Route path='/*' element={sessionStorage.token ? <HomePage onLogoutClick={handleLogoutClick} /> : <Navigate to="login" />} />
            </Routes>

            {feedback.message && <Feedback level={feedback.level} message={feedback.message} onClick={handleAcceptFeedback} />}
        </div>
    </Context.Provider>
}

export default App
