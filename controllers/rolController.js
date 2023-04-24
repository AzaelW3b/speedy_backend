import Rol from '../models/Rol.js'


export const crearRol = async ( req, res ) => {
    try {
        const rol = new Rol( req.body )
        await rol.save()
        res.json( rol )
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const obtenerRoles = async ( req, res ) => {
    try {
        const roles =  await Rol.find({})
        res.json( roles )

    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const actualizarRol = async ( req, res ) => {
    const { rol } = req.body
    const nuevoRol = {}

    if (rol) {
        nuevoRol.rol = rol
    }

    try {
        let rolExiste = await Rol.findById( req.params.id )
        
        if(!rolExiste) {
            return res.status(404).json({ msg: 'Rol no encontrado' })
        }

        rolExiste = await Rol.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoRol }, { new: true })
        
        res.json( rolExiste )
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const eliminarRol = async ( req, res ) => {
    try {
        let rol = await Rol.findById(req.params.id)

        if (!rol) {
            return res.status(404).json({ msg: 'Rol no encontrado' })
        }

        await Rol.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Rol eliminado' })

    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}