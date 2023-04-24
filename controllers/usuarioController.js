import Usuario from '../models/Usuario.js'
import generarJWT from '../helpers/generarJWT.js'

export const crearUsuario = async ( req, res ) => {

    const { correo } = req.body

    // Buscamos por diferentes atributos
    const existeUsuario = await Usuario.findOne({ correo })

    if(existeUsuario) {
        return res.status(400).json({ msg: 'Usuario ya registrado' })
    }

    try {
        const usuario = new Usuario(req.body)

        await usuario.save()

        res.json( usuario )

        
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error en el servidor')
    }
}

export const autenticarUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body

        // comprobar si el usuario existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(403).json({msg: 'El usuario no existe'})
        }
        // Revisar el password
        if(await usuario.comprobarPassword(password)) {
            // autenticar
            console.log(usuario._id)
            res.json({ token: generarJWT(usuario._id) })
        } else {
            return res.status(403).json({ msg: 'El password es incorrecto' })
        }

    } catch (error) {
        console.log( error )

    }
}


//   const usuarios = {
  
//     _id: Date.now(),
//     nombreUsuario: 'Azael Garcia Jaimes',
//     correo: 'azaelweb1@gmail.com',
//     password: 'speedy123',
//     rol: 'admin'
  
//   }
  