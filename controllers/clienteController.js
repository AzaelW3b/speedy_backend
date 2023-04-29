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
        clienteInvitadoUno, 
        clienteInvitadoDos, 
        clienteInvitadoTres, 
        invitadosCantidad, 
        rol 
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

    if (clienteInvitadoUno) {
        nuevoCliente.clienteInvitadoUno = clienteInvitadoUno
    }

    if (clienteInvitadoDos) {
        nuevoCliente.clienteInvitadoDos = clienteInvitadoDos
    }

    if (clienteInvitadoTres) {
        nuevoCliente.clienteInvitadoTres = clienteInvitadoTres
    }

    if (invitadosCantidad) {
        nuevoCliente.invitadosCantidad = invitadosCantidad
    }

    if (rol) {
        nuevoCliente.rol = rol
    }

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
            res.json({ token: generarJWT(cliente._id) })
        } else {
            return res.status(403).json({ msg: 'El password es incorrecto' })
        }

    } catch ( error ) {
        console.log( error )

    }
}

export const perfil = async ( req, res ) => {
    const { cliente } = req
    res.json(cliente)
    console.log('mostrando perfil')
}


//   const usuarios = {
  
//     _id: Date.now(),
//     nombreUsuario: 'Azael Garcia Jaimes',
//     correo: 'azaelweb1@gmail.com',
//     password: 'speedy123',
//     rol: 'admin'
  
//   }
  