import {EMAIL_REGEX} from './constants'
const API_URL = process.env.REACT_APP_API_URL

function updateUserEmail(token,newEmail, callback) {
    if(typeof token !== 'string') throw new TypeError('token is not a string')
    if(token.trim().length===0)throw new Error('token is empty or black')

    if(typeof newEmail !== 'string') throw new TypeError('new email  is not a string')
    if(newEmail.trim().length===0)throw new Error('new email is empty or black')
    if(newEmail.length<8) throw new Error('new email length is less than 8 charcaters')
    if (!EMAIL_REGEX.test(newEmail)) throw new Error('email is not valid')

    if(typeof callback !== 'function')throw new TypeError('callback is nota a function')
    const xhr = new XMLHttpRequest

    // response

    xhr.onload = function () {
        const status = xhr.status

        if (status >= 500)
            callback(new Error(`server error (${status})`))
        else if (status >= 400)
            callback(new Error(`client error (${status})`))
        else if (status === 204)
            callback(null)
    }

    //request
    xhr.open('PATCH', `${API_URL}/users`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.setRequestHeader('Content-type', 'application/json')

    const json = JSON.stringify({ email: newEmail })

    xhr.send(json)
}
export default updateUserEmail