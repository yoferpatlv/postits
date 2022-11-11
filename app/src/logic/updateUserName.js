const API_URL = process.env.REACT_APP_API_URL

function updateUserName(token,newName, callback) {
    if(typeof token !== 'string') throw new TypeError('token is not a string')
    if(token.trim().length===0)throw new Error('token is empty or black')

    if(typeof newName !== 'string') throw new TypeError('new user name  is not a string')
    if(newName.trim().length===0)throw new Error('new user name is empty or black')
    if(newName.length<2) throw new Error('new user name length is less than 2 charcaters')

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

    const json = JSON.stringify({ name: newName })

    xhr.send(json)
}
export default updateUserName