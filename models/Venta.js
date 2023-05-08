import mongoose from 'mongoose'

const ventaSchema = mongoose.Schema({
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cliente'
    },
    productos: {
        type: Array
    },
    total: {
        type: Number, 
        min: 0, 
        max: 1000000 
    },
    fecha: {
        type: Date,
        default: Date.now(),
    },
    cashback: {
        type: Number, 
        min: 0, 
        max: 1000000 
    }
})

const Venta = mongoose.model('Venta', ventaSchema)

export default Venta
