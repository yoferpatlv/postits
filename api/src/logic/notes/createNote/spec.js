const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note } = require('../../../models')
const { NotFoundError } = require('errors')
const createNote = require('.')

describe('createNote', () => {
    beforeAll(() => connect('mongodb://localhost:27017/postits-test'))
    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    it('succeeds on correct data', () => {
        //happy path
        const name = 'Pepito Grillo'
        const email = 'pepito@grillo.com'
        const password = '123123123'
        const text = 'hola mundo'

        return User.create({ name, email, password })
            .then(user =>
                 createNote(user.id,text)
                    .then(res => {
                        expect(res).toBeUndefined()

                        return Note.find()
                    })
                    .then(notes => {
                        expect(notes).toHaveLength(1)

                        const [note] = notes

                        expect(note.user.toString()).toEqual(user.id)
                        expect(note.text).toEqual('hola mundo')
                        expect(note.visibility).toEqual('private')
                        expect(note.createAt).toBeInstanceOf(Date)
                        expect(note.modifiedAt).toBeUndefined()
                    })
            )
    })

    it('fails on non-existing user',()=>{//unhappy path
        const userId = new ObjectId().toString()
        const text= 'hola mundo'
        return createNote(userId,text)
        .then(()=>{throw new Error('should not reach this point')})
        .catch(error=>{
            expect(error).toBeInstanceOf(NotFoundError)
            expect(error.message).toEqual(`user with id ${userId} not found`)
        })
    })

    afterAll(()=> disconnect())
})