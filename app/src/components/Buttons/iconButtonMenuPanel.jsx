import Loggito from '../../utils/Loggito'

function IconButtonMenuPanel({onClick,text,nameIcon}){
    const logger = new Loggito('IconButtonMenuPanel')

    logger.info('return')
    // if(text==='dark') nameIcon='Dark'

    // if(text==='dark') nameIcon='Dark'

    return <a className="menu__link" onClick={onClick}><span className="material-symbols-outlined">{text}</span>{nameIcon}</a>
}

export default IconButtonMenuPanel