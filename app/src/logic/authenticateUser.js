import { validateEmail, validatePassword, validateCallback } from 'validators'
import { AuthError, ClientError, ServerError, UnknownError } from 'errors'

const API_URL = process.env.REACT_APP_API_URL

/** 
 * Checks user credentials against database
 * 
 * @param {string} email The user email
 * @param {string} password The user password
 * @param {function} callback The function expression that provides a result
 * 
 * @throws {FormatError | TypeError} On invalid inputs
 */

function authenticateUser(email, password, callback) {
    //TODO validate inputs
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)


    const xhr=new XMLHttpRequest

    //response
    xhr.onload=function(){
        const status= xhr.status
        const json = xhr.responseText

        const { error, token } = JSON.parse(json)
        
        // if (status >= 500)
        //     callback(new Error(`server error(${status})`))
        // else if (status >= 400)
        //     callback(new Error(`client error Auth(${status})`))
        // else if (status === 200){
        //     //recibo un JSON en la propiedad responseText del XHR
        //     const json = xhr.responseText
            
        //     //Parseo el JSON a JS
        //     const data=JSON.parse(json)
            
        //     //Accedoa a la propiedad token del objeto
        //     const token =data.token

        //     //llamo a callback con null, en el parametro  de manejo de errores
        //     callback(null,token)
        // }
        switch(true) {
            case (status >= 500):
                callback(new ServerError(error))
                break
            case (status === 401):
                callback(new AuthError(error))
                break
            case (status >= 400): 
                callback(new ClientError(error))
                break
            case (status === 200):
                callback(null, token)
                break
            default:
                callback(new UnknownError(`unexpected status ${status}`))
        }
    }

    //request
    
    //el metodo open es para crear una conexion con el servidor remoto(iniciarlizar la conexion) 
    xhr.open('POST', `${API_URL}/users/auth`)

    //el metodo setRequestHeader establece el valor de un encabezado de solicitud HTTP. Debe llamar después de open(), pero antes de send().setRequestHeader()
    xhr.setRequestHeader('Content-type', 'application/json')

    //el metodo send es para el envio de la solicitud al servidor
    xhr.send(`{"email": "${email}","password": "${password}"}`)
}

// authenticateUser( "jose@fer.com", "123123123", console.log)

//que la callback del authenticate llame al retrieveUser

export default authenticateUser