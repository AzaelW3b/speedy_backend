import Cliente from '../models/Cliente.js'
import generarJWT from '../helpers/generarJWT.js'

export const crearCliente = async ( req, res ) => {

    const { correo } = req.body

    // Buscamos por diferentes atributos
    const existeCliente = await Cliente.findOne({ correo })

    if (existeCliente) {
        return res.status(400).json({ msg: 'Cliente ya registrado' })
    }

    try {
        const cliente = new Cliente(req.body)

        await cliente.save()

        res.json( cliente )

        
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error en el servidor')
    }
}

export const obtenerClientes = async ( req, res ) => {
    try {
        const clientes = await Cliente.find({})
        res.json(clientes)
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}


export const actualizarCliente = async ( req, res ) => {
    const { 
        nombreCliente, 
        telefono, 
        correo, 
        password, 
        fueInvitado, 
        invitadoPor,
        invitados,
        niveles,
        rol,
        banco,
        numeroCuenta
    } = req.body


    const nuevoCliente = {}

    if (nombreCliente) {
        nuevoCliente.nombreCliente = nombreCliente
    }

    if (telefono) {
        nuevoCliente.telefono = telefono
    }

    if (correo) {
        nuevoCliente.correo = correo
    }

    if (password) {
        nuevoCliente.password = password
    }

    if (fueInvitado) {
        nuevoCliente.fueInvitado = fueInvitado
    }

    if (invitadoPor) {
        nuevoCliente.invitadoPor = invitadoPor
    }

    if (rol) {
        nuevoCliente.rol = rol
    }
    if (invitados) {
        nuevoCliente.invitados = invitados

    }
    if (niveles) {
        nuevoCliente.niveles = niveles
    }

    if (banco) {
        nuevoCliente.banco = banco
    }

    if (numeroCuenta) {
        nuevoCliente.numeroCuenta = numeroCuenta
    }
    
    console.log(nuevoCliente)

    try {
        let clienteExiste = await Cliente.findById(req.params.id)

        if (!clienteExiste) {
            return res.status(404).json({ msg: 'Cliente no encontrado' })
        }
        clienteExiste = await Cliente.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoCliente }, { new: true })
        res.json( clienteExiste )
        
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const eliminarCliente = async ( req, res ) => {
    try {
        let cliente = await Cliente.findById(req.params.id)

        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' })
        }

        await Cliente.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Cliente eliminado' })

    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}


export const autenticarCliente = async (req, res) => {
    try {
        const { correo, password } = req.body

        // comprobar si el cliente existe
        const cliente = await Cliente.findOne({ correo })
        if (!cliente) {
            return res.status(403).json({ msg: 'El cliente no existe' })
        }
        // Revisar el password
        if(await cliente.comprobarPassword(password)) {
            // autenticar
            res.json({ token: generarJWT(cliente._id), isAdmin: 2 })
        } else {
            return res.status(403).json({ msg: 'El password es incorrecto' })
        }

    } catch ( error ) {
        console.log( error )

    }
}

export const perfil = async ( req, res ) => {
    const { cliente } = req
    res.json({usuario: cliente})
    console.log('mostrando perfil')
}

export const obtenerInvitadoPorSocioPrincipal = async (req, res) => {
    try {
      const cliente = await Cliente.findById(req.params.id).populate('invitados.cliente')
      if (!cliente) {
        return res.status(404).json({ msg: 'Cliente no encontrado' })
      }
      res.json(cliente?.invitados?.filter(cliente => cliente?.cliente !== null))
    } catch (error) {
      console.error(error)
      res.status(500).json({ msg: 'Error en el servidor' })
    }
  }
