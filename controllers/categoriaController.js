import Categoria from '../models/Categoria.js'


export const crearCategoria = async ( req, res ) => {
    try {
        const categoria = new Categoria( req.body )
        await categoria.save()

        res.json( categoria )
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const obtenerCategorias = async ( req, res ) => {
    try {
        const categorias =  await Categoria.find({})
        res.json( categorias )

    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const actualizarCategoria = async ( req, res ) => {
    const { nombreCategoria } = req.body
    const nuevaCategoria = {}

    if (nombreCategoria) {
        nuevaCategoria.nombreCategoria = nombreCategoria
    }

    try {
        let categoriaExiste = await Categoria.findById( req.params.id )
        
        if(!categoriaExiste) {
            return res.status(404).json({ msg: 'Categoria no encontrada' })
        }

        categoriaExiste = await Categoria.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevaCategoria }, { new: true })
        
        res.json( categoriaExiste )
    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}

export const eliminarCategoria = async ( req, res ) => {
    try {
        let categoria = await Categoria.findById(req.params.id)

        if (!categoria) {
            return res.status(404).json({ msg: 'Categoria no encontrada' })
        }

        await Categoria.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Categoria eliminada' })

    } catch ( error ) {
        console.log( error )
        res.status(500).send('Hubo un error')
    }
}