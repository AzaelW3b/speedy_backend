import mongoose from 'mongoose'
import Counter from './Counter.js'
const ventaSchema = mongoose.Schema({
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cliente'
    },
    tipoMembresia: {
        type: String
    },
    nivel: {
        type: Number, 
        min: 0, 
        max: 1000000 
    },
    cashback: {
        type: Number, 
        min: 0, 
        max: 1000000 
    },
    totalCompra: {
        type: Number, 
        min: 0, 
        max: 1000000 
    },
    fecha: {
        type: Date,
        default: Date.now(),
    },
    folio: {
        type: String,
        unique: true
    }
})

ventaSchema.pre('save', async function (next) {
    const doc = this;
    if (doc.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { id: 'folio' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        doc.folio = `speedy${counter.seq.toString().padStart(10, '0')}`;
    }
    next();
});

const Venta = mongoose.model('Venta', ventaSchema)

export default Venta
