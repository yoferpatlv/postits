const { connect, disconnect } = require('mongoose')
const { User } = require('../../../models')
const { DuplicityError } = require('errors')
const  registerUser = require('.')

describe('registerUser', () => {
    //antes de todo me conecto a la base de datos
    beforeAll(() => connect('mongodb://localhost:27017/postits-test'))

    beforeEach(() => User.deleteMany()) //eliminar cada usuario

    it('succeds on new user', () => {  //happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        return registerUser(name, email, password)
            .then(res => {
                //no espero un resultado por la tanto lo coloco como no definido
                expect(res).toBeUndefined()
                //prometo el regreso de del email del usuario encontrado
                return User.find({ email })
            })
            .then(users => {
                //espero que la longitud de users sea 1
                expect(users).toHaveLength(1)

                const [user] = users

                expect(user.name).toEqual(name)
                expect(user.email).toEqual(email)
                expect(user.password).toEqual(password)
            })
    })

    it('fails on existing user', () => {//unhappy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'

        //con el metodo .create creamos usuario que nos retorna el parametro user
        return User.create({ name, email, password })
            .then(() => {
                return registerUser(name, email, password)
            })
            .catch(error => {
                expect(error).toBeInstanceOf(DuplicityError)
                expect(error.message).toEqual('user already exists')

            })
    })
    afterAll(() => disconnect())
})