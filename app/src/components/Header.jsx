//import para modulos
import { useState } from 'react'
// import './Header.css'
import Menu from './Menu'
import IconButton from './Buttons/IconButton'
import Loggito from '../utils/Loggito'
import withContext from '../utils/withContext'

function Header({ name, onLogoutClick, onSettingsClick ,  context:{theme}   }) {
    const logger = new Loggito('Header')
    const [view, setView] = useState(null)
    // [null, f(){}]

    const handleMenuClick = () => {
        setView('menu')

        logger.debug('setView', 'menu')
    }

    const handleCloseClick = () => {
        setView(null)

        logger.debug('setView', null)
    }

    const handleSettingsClick = () => {
        setView(null)

        logger.debug('setView', null)

        onSettingsClick()
    }

    logger.info('return')

    return <header className="header_home">
        <div className="cont__header">
            <div className="link_home" >           
                { theme==='dark' && <img className="logo-home " src="https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg" alt="" />}
                { theme==='light' && <img className="logo-home " src="https://i.postimg.cc/mZqYhbGW/luanna-Logo.png" alt="" />}
            </div>
            <h1 className="messageTitle">Hello {name} !</h1>

            <div className="btn-menClo">
                {view === null && <IconButton addClass="btn-menu" text="menu" onClick={handleMenuClick} />}
                {view === "menu" && <IconButton addClass="btn-menu" text="close" onClick={handleCloseClick} />}
            </div>
        </div>
        {view === "menu" && <Menu onLogoutClick={onLogoutClick} onSettingsClick={handleSettingsClick} />}
    </header>
}

export default withContext(Header)
