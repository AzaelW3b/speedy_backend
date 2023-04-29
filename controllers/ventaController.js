import Venta from '../models/Venta.js'


export const crearVenta = async ( req, res ) => {
    try {
        const venta = new Venta( req.body )
        await venta.save()

        res.json( venta )
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const obtenerVentas = async ( req, res ) => {
    try {
        const ventas =  await Venta.find({})
        res.json( ventas )

    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

// export const obtenerVentaClienteId = async (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// }

export const actualizarVenta = async ( req, res ) => {
    const { productos, total, fecha } = req.body
    const nuevaVenta = {}

    if (productos) {
        nuevaVenta.productos = productos
    }

    if (total) {
        nuevaVenta.total = total
    }

    if (fecha) {
        nuevaVenta.fecha = fecha
    }

    try {
        let ventaExiste = await Venta.findById( req.params.id )
        
        if(!ventaExiste) {
            return res.status(404).json({ msg: 'Venta no encontrada' })
        }

        ventaExiste = await Venta.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevaVenta }, { new: true })
        
        res.json( ventaExiste )
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const eliminarVenta = async ( req, res ) => {
    try {
        let venta = await Venta.findById(req.params.id)

        if (!venta) {
            return res.status(404).json({ msg: 'Venta no encontrada' })
        }

        await Venta.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Venta eliminada' })

    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}