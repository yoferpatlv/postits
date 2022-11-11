const express = require('express')
const {Router, json} = express
const jsonBodyParser = json()
const {registerUserHandler, authenticateUserHandler, retrieveUserHandler} = require('./users')
const { createNoteHandler,retrieveNotesHandler,updateNoteTextHandler} = require('./notes')

const usersRouter = Router()

usersRouter.post('/users', jsonBodyParser, registerUserHandler)

usersRouter.post('/users/auth',jsonBodyParser,authenticateUserHandler)

usersRouter.get('/users',retrieveUserHandler)
// TODO usersRouter.patch('/users/email',jsonBodyParser,updateUserEmailHandler)
// TODO usersRouter.patch('/users/password',jsonBodyParser,updateUserPasswordHandler)
// TODO usersRouter.patch('/users/name',jsonBodyParser,updateUserNameHandler)


const notesRouter = Router()

notesRouter.post('/notes', jsonBodyParser,createNoteHandler)
notesRouter.get('/notes', retrieveNotesHandler)
notesRouter.patch('/notes/:noteId', jsonBodyParser,updateNoteTextHandler)

module.exports={
    usersRouter,
    notesRouter
}