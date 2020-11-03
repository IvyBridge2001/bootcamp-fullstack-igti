import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import routes from './routes.js'

const port = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

dotenv.config()

mongoose.connect(process.env.CONNECTION, { 
  useUnifiedTopology: true, useNewUrlParser: true 
}).then(() => {
  console.log('> Servidor conectado ao MongoDB.')
  app.emit('ready')
}).catch(() => {
  console.log('> Erro em conectar ao MongoDB.')
  process.exit()
})

app.on('ready', () => {
  app.listen(port, () => {
    console.log(`> Servidor executando na porta ${port}.`)
  })
})
