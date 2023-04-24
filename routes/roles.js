import express from 'express'
const router = express.Router()
import { actualizarRol, crearRol, eliminarRol, obtenerRoles } from '../controllers/rolController.js'

router.post('/', crearRol)
router.get('/', obtenerRoles)
router.put('/:id', actualizarRol)
router.delete('/:id', eliminarRol)



export default router