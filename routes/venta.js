import express from 'express'
import { actualizarVenta, crearVenta, eliminarVenta, obtenerVentas } from '../controllers/ventaController.js'

const router = express.Router()

router.post('/', crearVenta)
router.get('/', obtenerVentas)
router.put('/:id', actualizarVenta)
router.delete('/:id', eliminarVenta)



export default router