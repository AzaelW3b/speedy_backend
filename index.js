import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import cors from 'cors'
import rolesRouter from './routes/roles.js'
import usuariosRouter from './routes/usuarios.js'
import clientesRouter from './routes/clientes.js'
import categoriasRouter from './routes/categoria.js'
import productosRouter from './routes/producto.js'
import ventasRouter from './routes/venta.js'
import inventarioRouter from './routes/inventario.js'

const app = express()
app.use( cors() )

dotenv.config()

conectarDB()


app.use(express.json({ extended: true }))


const PORT = process.env.PORT || 5000

app.use('/api/roles', rolesRouter)
app.use('/api/usuarios', usuariosRouter)
app.use('/api/clientes', clientesRouter)
app.use('/api/categorias', categoriasRouter)
app.use('/api/productos', productosRouter)
app.use('/api/ventas', ventasRouter)
app.use('/api/inventario', inventarioRouter)

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${ PORT }`)
})