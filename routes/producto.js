import express from 'express'
const router = express.Router()
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductos } from '../controllers/productoController.js'

router.post('/', crearProducto)
router.get('/', obtenerProductos)
router.put('/:id', actualizarProducto)
router.delete('/:id', eliminarProducto)



export default router