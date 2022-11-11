import './IconButton.css'
import Loggito from '../../utils/Loggito'

function IconButton({onClick,text,addClass}){
    const logger = new Loggito('IconButton')

    logger.info('return')
    return <span className={`material-symbols-outlined ${addClass}`} onClick={onClick}>{text}</span>
}

export default IconButton