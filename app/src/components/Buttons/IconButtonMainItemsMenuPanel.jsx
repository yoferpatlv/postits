import Loggito from '../../utils/Loggito'

function IconButtonMainItemsMenuPanel({onClick,text}){
    const logger = new Loggito('IconButtonMainItemsMenuPanel')
    logger.info('return')

    return <div className="btnBack">
    <span className="material-symbols-outlined btn-menu" onClick={onClick}>{text}</span>
    </div>
}
export default IconButtonMainItemsMenuPanel