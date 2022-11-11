// const { NotFoundError } = require('errors')
// const { User, Note } = require('../models')

// function deleteNote(userId, noteId) {
//     //TODO INPUT VALIDATIONS

//     return (async () => {
//         const user = await User.findById(userId)

//         if(!user) throw new NotFoundError(`User with ID ${userId} not found`)

//         const note = await Note.findOne({user: userId, _id: noteId})

//         if(!note) throw new NotFoundError(`Note with id ${noteId} not found`)

//         await Note.deleteOne({_id: noteId})

//     })()

// }

// module.exports = deleteNote