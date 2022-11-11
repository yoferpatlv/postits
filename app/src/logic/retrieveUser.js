const API_URL = process.env.REACT_APP_API_URL
function retrieveUser(token, callback) {
    //condicionales de entrada en el input
    //Si el token no es string, muestro el error ...
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    // .trim() borra los espacios del principio y final del texto 
    if (token.trim().length === 0) throw new Error('token is empty or blank')


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
        else if (status === 200) {

            // debugger;
            const tokenJson = xhr.responseText

            //Parseo el JSON a JS
            const data = JSON.parse(tokenJson)

            //Accedo a a la propiedad token del objeto
            const user={
                name:data.name,
                email:data.username
                
            }

            //llamo a callback con null, en el parametro  de manejo de errores
            callback(null, user)
        }

    }

    //request

    //el metodo open es para crear una conexion con el servidor remoto(iniciarlizar la conexion) 
    xhr.open('GET', `${API_URL}/users`)

    //el metodo setRequestHeader establece el valor de un encabezado de solicitud HTTP. Debe llamar después de open(), pero antes de send().setRequestHeader()
    xhr.setRequestHeader('Authorization', `bearer ${token}`)

    //el metodo send es para el envio de la solicitud al servidor
    xhr.send()
}


// retrieveUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmRmZTdmNmQ0NDE4ODAwMTdiMjNkMWEiLCJpYXQiOjE2NTg5MTU5MTYsImV4cCI6MTY1ODkxOTUxNn0.VlwVbngBHaLNURHlsOvlu06ceeuWMo1DNntklgiWLwk',console.log)
export default retrieveUser