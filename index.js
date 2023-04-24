import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import cors from 'cors'
import rolesRouter from './routes/roles.js'
import usuariosRouter from './routes/usuarios.js'

const app = express()
app.use( cors() )

dotenv.config()

conectarDB()


app.use(express.json({ extended: true }))


const PORT = process.env.PORT || 5000

app.use('/api/roles', rolesRouter)
app.use('/api/usuarios', usuariosRouter)

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${ PORT }`)
})