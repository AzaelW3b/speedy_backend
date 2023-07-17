import mongoose from 'mongoose'

const inventarioSchema = mongoose.Schema({
    codigoBarras: {
        type: String,
        trim: true
    },
    nombreProducto: {
        type: String,
        trim: true
    },
    cantidad: {
        type: Number,
        min: 0,
        max: 1000000 
    }
})

const Inventario = mongoose.model('Inventario', inventarioSchema)
export default Inventario