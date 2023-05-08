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
    const { productos, total, fecha, cashback } = req.body
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
    if (cashback) {
        nuevaVenta.cashback = cashback
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

export const obtenerVentasDelDia = async (req, res) => {
    try {
        const fechaInicio = new Date()
        fechaInicio.setHours(0, 0, 0 ,0)
        const fechaFin = new Date()
        fechaFin.setHours(23 ,59 ,59 ,999)

        const ventasDia = await Venta.find({
            fecha: {
                $gte: fechaInicio,
                $lte: fechaFin
            }
        })
        const cantidadVentas = ventasDia.length
        const totalVentasDia = ventasDia.reduce((total, venta) => total + venta.total, 0)

        res.json({ cantidadVentas, totalVentasDia })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al obtener las ventas del dia' })
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