const { connect, disconnect } = require('mongoose')
const { User } = require('../../../models')
const { NotFoundError, AuthError } = require('errors')
const  authenticateUser  = require('.')

describe('authenticateUser', () => {
    //antes de todo me conecto a la base de datos
    beforeAll(() => connect('mongodb://localhost:27017/postits-test'))

    beforeEach(() => User.deleteMany()) //eliminar cada usuario

    it('succeeds on existing user', () => {//happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        //con el metodo .create creamos usuario que nos retorna el parametro user
        return User.create({ name, email, password })
            .then(user => {
                return authenticateUser(email, password)
                .then(userId => 
                    expect(userId).toEqual(user.id))
                })

    })
    it('fails on non-existing user', () => {//unhappy path
        const email = 'pepito@grillo.com'
        const password = '123123123'

        //con el metodo .create creamos usuario que nos retorna el parametro user
        return authenticateUser(email, password)
            .catch(error => {
                expect(error).toBeInstanceOf(NotFoundError)
                expect(error.message).toEqual(`user with email ${email} not found`)
            })

    })

    it('fails on existing user but wrong password', () => {//unhappy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        //con el metodo .create creamos usuario que nos retorna el parametro user
        return User.create({ name, email, password })
            .then(user =>{
                 return authenticateUser(email, password + '-wrong')
                .catch(error => {
                    expect(error).toBeInstanceOf(AuthError)
                    expect(error.message).toEqual('wrong password')
                })
            })
    })
    afterAll(() => disconnect())
})