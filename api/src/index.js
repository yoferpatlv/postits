const { connect, disconnect } = require('mongoose')
const { createLogger } = require('./utils')
const cors =require('cors')

const logger = createLogger(module) //arreglar

connect('mongodb://localhost:27017/postits-test')
    .then(() => {
        logger.info('db connected')
        const express = require('express')
        const api = express()

        const { usersRouter, notesRouter } = require('./routes')

        api.use(cors())

        api.get('/',(req,res) => res.send('Postits Api v1.0'))

        api.use('/api', usersRouter, notesRouter)

        api.listen(8080, () => logger.info('api started'))

        process.on('SIGINT', () => {
            if (!process.stopped) {
                process.stopped = true

                logger.info('\n api stopped')

                disconnect()
                    .then(() => {
                        logger.info('db disconnected')

                        process.exit(0)
                    })
            }
        })
    })
    .catch(error => {
        console.error(error)
    })