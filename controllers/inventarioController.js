import Inventario from '../models/Inventario.js'

export const crearInventario = async ( req, res ) => {
    try {
        const inventario = new Inventario( req.body )
        await inventario.save()
        res.json(inventario)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')

    }
}

export const obtenerInventario = async ( req, res ) => {
    try {
        const inventario = await Inventario.find({})
        res.json( inventario )
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

export const actualizarInventario = async (req, res) => {
    const { codigoBarras, nombreProducto, cantidad, precioCompra, precioSalida } = req.body
    const nuevoInventario = {}

    if (codigoBarras) {
        nuevoInventario.codigoBarras = codigoBarras
    }
    if (nombreProducto) {
        nuevoInventario.nombreProducto = nombreProducto
    }
    if (cantidad) {
        nuevoInventario.cantidad = cantidad
    }

    if (precioCompra) {

    }   nuevoInventario.precioCompra = precioCompra
    
    if (precioSalida) {
        nuevoInventario.precioSalida = precioSalida
    }
    try {
        let inventarioExiste = await Inventario.findOne( { codigoBarras: req.params.id } )
        if (!inventarioExiste) {
            return res.status(404).json({ msg: 'Inventario no encontrado' })
        }
        inventarioExiste = await Inventario.findOneAndUpdate({ codigoBarras: req.params.id }, { $set: nuevoInventario }, { new: true })
        res.json( inventarioExiste )

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

export const eliminarInventario = async ( req, res ) => {
    try {
        let inventario = await Inventario.findById(req.params.id)

        if (!inventario) {
            return res.status(404).json({ msg: 'Categoria no encontrada' })
        }
        await Inventario.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Inventario eliminado' })
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}