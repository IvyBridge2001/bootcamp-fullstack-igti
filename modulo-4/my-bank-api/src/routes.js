import express from 'express'

import Controller from './controllers.js'

const routes = express.Router()

const controller = new Controller()

routes.post('/new-account', controller.store)
routes.get('/index', controller.index)
routes.patch('/deposit', controller.deposit)
routes.patch('/withdraw', controller.withdraw)
routes.get('/balance', controller.checkBalance)
routes.delete('/delete', controller.destroy)
routes.patch('/transfer', controller.transfer)
routes.get('/average', controller.average)
routes.get('/min', controller.minBalance)
routes.get('/max', controller.maxBalance)
routes.get('/private', controller.private)

export default routes