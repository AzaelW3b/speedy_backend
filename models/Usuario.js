import mongoose from 'mongoose'

const usuarioSchema = mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Rol'
    },
    registro:{
        type:Date,
        default: Date.now(),
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario