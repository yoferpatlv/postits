import {EMAIL_REGEX} from './constants'
const API_URL = process.env.REACT_APP_API_URL
function registerUser(name, email, password, callback) {
    // TODO validate inputs
    //condicionales de entrada en el input
    //Si el email no es string, muestro el error ...
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    // .trim() borra los espacios del principio y final del texto 
    if (email.trim().length === 0) throw new Error('email is empty or blank')
    if (email.length < 6) throw new Error('email length is not valid')
    if (!EMAIL_REGEX.test(email)) throw new Error('email is not valid')

    //falta validar el formato de email 

    if (typeof password !== 'string') throw new TypeError('email is not a string')
    if (password.trim().length === 0) throw new Error('password is empty or blanck')
    if (password.length < 8) throw new Error('password length is less than 8 characters')

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    //XMLHttpRequest nos permite hacer peticiones a un servidor web y obtener las respuestas que este envia
    const xhr = new XMLHttpRequest

    //response

    //el metodo onload se lanza cuando una transacción XMLHttpRequest se completa con éxito
    xhr.onload = function () {
        const status = xhr.status

        if (status >= 500)
            callback(new Error(`server error(${status})`))
        else if (status >= 400)
            callback(new Error(`client error(${status})`))
        else if (status === 201)
            callback(null)
    }

    // xhr.onerror = function () {
    //     console.log('API CALL FAIL')
    // }

    //request

    //el metodo open es para crear una conexion con el servidor remoto(iniciarlizar la conexion) 
    xhr.open('POST', `${API_URL}/users`)

    //el metodo setRequestHeader establece el valor de un encabezado de solicitud HTTP. Debe llamar después de open(), pero antes de send().setRequestHeader()
    xhr.setRequestHeader('Content-type', 'application/json')

    //el metodo send es para el envio de la solicitud al servidor
    xhr.send(`{"name": "${name}","email": "${email}","password": "${password}"}`)
}

// registerUser("jose fer", "jose@fer.com", "123123123", console.log)
export default registerUser