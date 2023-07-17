import express from 'express'
import { crearInventario, obtenerInventario, actualizarInventario, eliminarInventario } from '../controllers/inventarioController.js'

const router = express.Router()

router.post('/', crearInventario)
router.get('/', obtenerInventario)
router.put('/:id', actualizarInventario)
router.delete('/:id', eliminarInventario)

export default router;