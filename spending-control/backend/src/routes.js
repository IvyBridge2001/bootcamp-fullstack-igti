import express from 'express'

import Transaction from './controllers.js'

const routes = express.Router()

const transaction = new Transaction()

routes.get('/index/:yearMonth', transaction.index)
routes.post('/', transaction.create)
routes.delete('/:id', transaction.delete)
routes.put('/', transaction.update)
routes.get('/distinct-years-months', transaction.distinctYearsMonths)

export default routes