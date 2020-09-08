import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import routes from './routes.js'

const app = express()

app.use(express.json()) 
app.use(routes)

dotenv.config()

mongoose.connect(process.env.CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('> Conectado ao MongoDB')
  app.emit('ok')
}).catch(error => console.log('Erro na conexão: ' + error))

app.on('ok', () => {
  app.listen(3000, () => {
    console.log('> Servidor executando na porta 3000')
    console.log('> Acessar: http://localhost:3000')
  })
})