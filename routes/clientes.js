import express from 'express'
const router = express.Router()
import authCliente from '../middleware/authCliente.js'
import { actualizarCliente, autenticarCliente, crearCliente, eliminarCliente, obtenerClientes, perfil } from '../controllers/clienteController.js'


router.post('/', crearCliente)
router.get('/', obtenerClientes)
router.put('/:id', actualizarCliente)
router.delete('/:id', eliminarCliente)
router.post('/login', autenticarCliente)
router.get('/perfil', authCliente, perfil)

export default router