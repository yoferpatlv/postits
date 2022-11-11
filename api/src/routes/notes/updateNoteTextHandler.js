const { runWithErrorHandling, createLogger, verifyToken } = require('../../utils')
const { notes: { updateNoteText } } = require('../../logic')
const logger = createLogger(module)

module.exports = (req, res) => {
    runWithErrorHandling(() => {
        const userId = verifyToken(req)

        const { body: { text }, params: { noteId } } = req

        return updateNoteText(userId, noteId, text)
            .then(() => res.status(204).send())
    }, res, logger)
}