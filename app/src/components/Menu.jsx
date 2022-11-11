import IconButtonMenuPanel from './Buttons/iconButtonMenuPanel'
import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'
import {useLocation} from 'react-router-dom'

function Menu({onLogoutClick,onSettingsClick,context: { toggleTheme }}){
    const logger = new Loggito('Menu')

    const location = useLocation()

    const handleSettingsClick = () => onSettingsClick()

    const handleLogoutClick = () => onLogoutClick()
    
    logger.info('return')
    
    return <nav className="menu-panel nav-home" id="nav-home">
    <ul className="menu-panel__list menu-home">
        {location.pathname !== '/settings' && <li className="menu-item item_settings"><IconButtonMenuPanel text='settings' nameIcon='Settings' onClick={handleSettingsClick}/></li>}
        {location.pathname !== '/design' && <li className="menu-item item_design"><IconButtonMenuPanel text='brush' nameIcon='Design'/></li>}
        {<li className="menu-item item_language"><IconButtonMenuPanel text='dark_mode' nameIcon='Theme' onClick={toggleTheme}/></li>}
        {<li className="menu-item item_logout"><IconButtonMenuPanel text='logout' nameIcon='Logout' onClick={handleLogoutClick}/></li>}
    </ul>
</nav>
}
export default withContext(Menu)