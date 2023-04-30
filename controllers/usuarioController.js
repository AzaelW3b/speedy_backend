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

export const obtenerUsuarios = async ( req, res ) => {
    try {
        const usuarios = await Usuario.find({})
        res.json(usuarios)
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}


export const actualizarUsuario = async ( req, res ) => {
    const { nombreUsuario, correo, password, rol } = req.body
    const nuevoUsuario = {}

    if (nombreUsuario) {
        nuevoUsuario.nombreUsuario = nombreUsuario
    }

    if (correo) {
        nuevoUsuario.correo = correo
    }

    if (password) {
        nuevoUsuario.password = password
    }

    if (rol) {
        nuevoUsuario.rol = rol
    }


    try {
        let usuarioExiste = await Usuario.findById(req.params.id)

        if (!usuarioExiste) {
            return res.status(404).json({ msg: 'Usuario no encontrado' })
        }
        usuarioExiste = await Usuario.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoUsuario }, { new: true })
        
        res.json({ msg: 'Usuario actualizado' })
        
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const eliminarUsuario = async ( req, res ) => {
    try {
        let usuario = await Usuario.findById(req.params.id)

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' })
        }

        await Usuario.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Usuario eliminado' })

    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}


export const autenticarUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body
        console.log(req.body)

        // comprobar si el usuario existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(403).json({ msg: 'El usuario no existe' })
        }
        // Revisar el password
        if(await usuario.comprobarPassword(password)) {
            // autenticar
            console.log(usuario._id)
            res.json({ token: generarJWT(usuario._id), isAdmin: 1 })
        } else {
            return res.status(403).json({ msg: 'El password es incorrecto' })
        }

    } catch ( error ) {
        console.log( error )

    }
}

export const perfil = async ( req, res ) => {
    const { usuario } = req
    res.json({ usuario })
    console.log('mostrando perfil')
}


//   const usuarios = {
  
//     _id: Date.now(),
//     nombreUsuario: 'Azael Garcia Jaimes',
//     correo: 'azaelweb1@gmail.com',
//     password: 'speedy123',
//     rol: 'admin'
  
//   }
  