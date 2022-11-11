import IconButton from './Buttons/IconButton'
import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'

function NewNoteForm({ onCloseClick, onArrowLeft,context:{handleFeedback} }) {
    const logger = new Loggito('NewNoteForm')

    
    logger.info('return')


    const handleFormSubmit = event => {
        event.preventDefault()

        //antes del value colocar name de donde se recoge el valor
        const newText = event.target.newNote.value

        if (newText === "") {
            handleFeedback({ message: "Discarded empty Note", level: 'info' })
            logger.warn("discarded empty note")
            onCloseClick()
        }
        else {
            onArrowLeft(newText)

            event.target.reset()
        }
    }

    return <form className="formcreateNote" name="formcreateNote" onSubmit={handleFormSubmit}>

        <button className="btn_arrLeft" type="submit"  >
            <IconButton addClass="arrow_back" text="arrow_back" />
        </button>

        <div className="list__itemNew">
            <textarea className="list__item-textNew" id="newNote" name="newNote"
                placeholder="New Note!!"
            ></textarea>
        </div>

    </form>
}

export default withContext(NewNoteForm)