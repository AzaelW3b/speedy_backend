import express from 'express'
const router = express.Router()

import { crearUsuario, autenticarUsuario } from '../controllers/usuarioController.js'


router.post('/', crearUsuario)
router.post('/login', autenticarUsuario)

export default router