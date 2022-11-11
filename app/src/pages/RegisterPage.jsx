import Loggito from '../utils/Loggito'
import registerUser from '../logic/registerUser'
import withContext from '../utils/withContext'

function RegisterPage({ onLinkClick, onSingUp, context:{handleFeedback,theme} }) {
    const logger = new Loggito(RegisterPage.name)

    
    logger.info('constructor')
    logger.info('return')

    const handleLinkClick = event => {
        event.preventDefault()

        onLinkClick()
    }

    const handleFormSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            password: { value: password }
        } = form

        try {
            registerUser(name, email, password, function (error) {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error'})

                    logger.warn(error.message)
                    return
                }
                handleFeedback({ message: error.message, level: 'error'})
                logger.debug('registered user')

                event.target.reset()
                onSingUp()
            })

        } catch (error) {
            handleFeedback({ message: error.message, level: 'error'})

            logger.warn(error.message)
        }

    }

    return <main className="container register_page">
        <form className="form form-register" onSubmit={handleFormSubmit}>
        { theme==='dark' && <img className="img-register " src="https://i.postimg.cc/XJt6N71Q/169506285-136925785104495-7194486606775599435-n.jpg" alt="" />}
                { theme==='light' && <img className="img-register " src="https://i.postimg.cc/mZqYhbGW/luanna-Logo.png" alt="" />}
            <div className="form__field">
                <label className="label__movil">USERNAME</label>
                <input className="input input-user" type="text" name="name" placeholder="Username" />
            </div>
            <div className="form__field">
                <label className="label__movil">EMAIL</label>
                <input className="input input-email" type="email" name="email" placeholder="Email" />
            </div>
            <div className="form__field">
                <label className="label__movil">PASSWORD</label>
                <input className="input input-pass" type="password" name="password" placeholder="Password" />
            </div>

            <button className="button-login" type="submit">SIGNUP</button>

        </form>

        <a className="link link-login" href="#" onClick={handleLinkClick}>LOGIN</a>
    </main>
}
export default withContext(RegisterPage)