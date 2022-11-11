// const { useState, useEffect } = React
import { useState, useEffect} from 'react'
import Loggito from '../utils/Loggito'
// import IconButton from '../components/Buttons/IconButton'
import retrieveUser from '../logic/retrieveUser'
import retrieveNotes from '../logic/retrieveNotes'
import createNote from '../logic/createNote'
import updateNoteText from '../logic/updateNoteText'
import deleteNote from '../logic/deleteNote'
import Header from '../components/Header'
import NoteList from '../components/NoteList'
import NewNoteForm from '../components/NewNoteForm'
import Settings from '../components/Settings'
import withContext from '../utils/withContext'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

function HomePage({ onLogoutClick, context: { handleFeedback } }) {

    const logger = new Loggito('HomePage')

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [notes, setNotes] = useState(null)

    
    // const [view, setView] = useState('list')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        logger.info('"componentDidMount"')
        try {
            retrieveUser(sessionStorage.token, (error, user) => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)
                    onLogoutClick()
                    return
                }
                setName(user.name)
                setEmail(user.email)

                logger.debug('setName', user.name)
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
        loadNotes()
    }, [])

    const loadNotes = () => {
        try {
            retrieveNotes(sessionStorage.token, (error, notes) => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)
                    return
                }
                setNotes(notes)
                logger.debug('setNotes', notes)
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }


    const handleAddClick = () => {
        navigate('newNote')
    }

    const handleArrowLeftClick = (newText) => {//onFormCreateNote
        try {
            createNote(sessionStorage.token, newText, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    return
                }
                loadNotes()
                navigate('/')
            })

        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }


    const handleUpdateNote = (noteId, text) => {
        try {
            updateNoteText(sessionStorage.token, noteId, text, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })
                    return
                }
                //agregado abajo en handleSettingsClick
                // loadNotes()
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    const handleDeleteNote = noteId => {
        try {
            deleteNote(sessionStorage.token, noteId, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)
                    return
                }
                loadNotes()
            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    const handleSettingsClick = () => {

        navigate('settings')

        logger.debug('navigate to settings')

        loadNotes()
    }

    const handleReturnNoteList = () => {
        // loadNotes()
        navigate('/')

        logger.debug('navigate to list')
    }

    const handleUpdateName = (newName) => setName(newName)
    const handleUpdateEmail = (newEmail) => setEmail(newEmail)

    logger.info('return')

    return name ?
        <div className="container home_page ">
            <Header name={name} onLogoutClick={onLogoutClick} onSettingsClick={handleSettingsClick}/>

            <main className="main_home">
                <Routes>
                    <Route path="/" element={<NoteList notes={notes} onUpdateNote={handleUpdateNote} onDeleteNote={handleDeleteNote}  />} />
                    <Route path="newNote" element={<NewNoteForm onArrowLeft={handleArrowLeftClick} onCloseClick={handleReturnNoteList} />}/>
                    <Route path="settings" element={<Settings onCloseClick={handleReturnNoteList} email={email} onUpdateEmail={handleUpdateEmail} onUpdateName={handleUpdateName} />}/>
                </Routes>
            </main>

            <footer className="footer_home">
                {location.pathname === '/' && <div className="btn_plus" onClick={handleAddClick}>
                    <span className="material-symbols-outlined add">add</span>
                </div>}
            </footer>
        </div>
        :
        null
}
export default withContext(HomePage)