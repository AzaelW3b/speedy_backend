import mongoose from 'mongoose'

const clienteSchema = mongoose.Schema({
    nombreCliente: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    correo: {
        type: String,
        trim: true,
        unique: true
    },
    fueInvitado: {
        type: Boolean,
        default: false
    },
    invitadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    clienteInvitadoUno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    clienteInvitadoDos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    clienteInvitadoTres: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    invitadosCantidad: {
        type: Number,
        default: 0
    }

})

const Cliente = mongoose.model('Cliente', clienteSchema)
export default Cliente
