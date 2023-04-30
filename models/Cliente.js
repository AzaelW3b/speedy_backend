import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
    password: {
        type: String,
        required: true
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
    },
    rol: {
       type: String,
       trim: true
    }, 

})

clienteSchema.pre('save', async function ( next ) {
    // si ya esta hasheado no lo vuelve a hashear
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})


clienteSchema.methods.comprobarPassword = async function( passwordFormulario ) {
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Cliente = mongoose.model('Cliente', clienteSchema)
export default Cliente
