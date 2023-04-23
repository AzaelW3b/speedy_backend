import mongoose from 'mongoose'

const productoSchema = mongoose.Schema({
    codigoBarras: {
        type: String,
        trim: true
    },
    nombreProducto: {
        type: String,
        trim: true
    },
    precio: {
        type: Number, 
        min: 0, 
        max: 1000000 
    },
    categoria: {
        type: String,
        trim: true
    }

})

const Producto = mongoose.model('Producto', productoSchema)
export default Producto