import jwt from 'jsonwebtoken'
import Cliente from '../models/Cliente.js'

const  authCliente = async ( req, res, next ) => {
    let token = ''

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.cliente = await Cliente.findById(decoded.id).populate('invitados.cliente').populate('invitados.cliente.invitadoPor').select('-password')

            return next()

        } catch ( error ) {

            console.log( error )
            return res.json(403).json({ msg: 'Token no valido' })
        }
    }
    if(!token) {
        res.status(403).json({ msg: 'Token no valido o inexistente' })
    }

    next()
}

export default authCliente