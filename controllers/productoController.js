import Producto from '../models/Producto.js'


export const crearProducto = async ( req, res ) => {
    const { codigoBarras } = req.body
    try {
        const existeProducto = await Producto.findOne({ codigoBarras })

        if (existeProducto) {
            return res.status(400).json({ msg: 'Producto ya registrado' })
        }
        
        const producto = new Producto( req.body )
        await producto.save()

        res.json( producto )
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const obtenerProductos = async ( req, res ) => {
    try {
        const productos =  await Producto.find({})
        res.json( productos )

    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const actualizarProducto = async ( req, res ) => {
    const { codigoBarras, nombreProducto, precio, categoria } = req.body
    const nuevoProducto = {}
    console.log(categoria)
    if (codigoBarras) {
        nuevoProducto.codigoBarras = codigoBarras
    }

    if (nombreProducto) {
        nuevoProducto.nombreProducto = nombreProducto
    }

    if (precio) {
        nuevoProducto.precio = precio
    }

    if (categoria) {
        nuevoProducto.categoria = categoria.value
    }


    try {
        let productoExiste = await Producto.findById( req.params.id )
        
        if(!productoExiste) {
            return res.status(404).json({ msg: 'Producto no encontrado' })
        }

        productoExiste = await Producto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProducto }, { new: true })
        
        res.json( productoExiste )
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const eliminarProducto = async ( req, res ) => {
    try {
        let producto = await Producto.findById(req.params.id)

        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' })
        }

        await Producto.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado' })

    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}