// import './'
import Loggito from '../utils/Loggito'
import './NoteList.css'

function NoteList({notes,onDeleteNote,onUpdateNote}) {
    const logger = new Loggito('List')
    logger.info('return')

    return <ul className="list-panel list ">
        {notes && notes.map(note => <li className="list__item" key={note.id}>
            <button className="btn__delete" onClick={() => onDeleteNote(note.id)}>X</button>
            <textarea className="list__item-text" 
                onKeyUp={event => {
                if (window.updateNoteTimeoutId)
                    clearTimeout(window.updateNoteTimeoutId)

                window.updateNoteTimeoutId = setTimeout(() => {
                    const text = event.target.value
                    onUpdateNote(note.id,text)
                }, 500)
            }}defaultValue={note.text}></textarea>

        </li>)}


    </ul>
}

export default NoteList