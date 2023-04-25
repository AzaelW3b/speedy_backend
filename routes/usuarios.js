import express from 'express'
const router = express.Router()
import checkAuth from '../middleware/auth.js'
import { crearUsuario, autenticarUsuario, perfil, obtenerUsuarios, actualizarUsuario, eliminarUsuario } from '../controllers/usuarioController.js'


router.post('/', crearUsuario)
router.get('/', obtenerUsuarios)
router.put('/:id', actualizarUsuario)
router.delete('/:id', eliminarUsuario)
router.post('/login', autenticarUsuario)
router.get('/perfil', checkAuth, perfil)

export default router