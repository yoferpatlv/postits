import Loggito from '../utils/Loggito'
import authenticateUser from '../logic/authenticateUser'
import withContext from '../utils/withContext'


function LoginPage({ onLinkClick, onLogIn, context:{handleFeedback,theme} }) {
    const logger = new Loggito(LoginPage.name)    

    logger.info('constructor')

    logger.info('return')

    const handleLinkClick = event => {
        event.preventDefault()

        onLinkClick()
    }

    const handleFormSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const { email: { value: email },
            password: { value: password }
        } = form

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)
                    return
                }
                logger.debug('user logged in')

                sessionStorage.token = token
                event.target.reset()
                onLogIn()

            })
        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }
    }

    return <main className="container login_page ">
        <form className="form form-login" onSubmit={handleFormSubmit}>
            
                {/* src="https://i.postimg.cc/ZY1nHGSz/logo-Luanna.png" */}
                {/* <img className="img img-login" src="https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg" alt="" /> */}
                { theme==='dark' && <img className="img-login " src="https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg" alt="" />}
                { theme==='light' && <img className="img-login " src="https://i.postimg.cc/mZqYhbGW/luanna-Logo.png" alt="" />}

            <div className="form__field">
                <label className="label__movil">EMAIL</label>
                <input className="input input-email" type="email" name="email" placeholder="Email" id="login-email" />
            </div>
            <div className="form__field">
                <label className="label__movil">PASSWORD</label>
                <input className="input input-pass" type="password" name="password" placeholder="Password" id="login-pass" />
            </div>

            <button className="button-login" type="submit">LOGIN</button>

        </form>

        <p className="nolink-register"> Not a member <a className="link link-register" href="#" onClick={handleLinkClick}> ! SINGUP NOW ¡</a></p>
    </main>
}
export default withContext(LoginPage)