import express from 'express'
import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategorias } from '../controllers/categoriaController.js'

const router = express.Router()

router.post('/', crearCategoria)
router.get('/', obtenerCategorias)
router.put('/:id', actualizarCategoria)
router.delete('/:id', eliminarCategoria)



export default router