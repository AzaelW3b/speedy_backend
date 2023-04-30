import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
        type: String,
        trim: true
    }, 
    token: {
        type: String,
    },
    registro:{
        type:Date,
        default: Date.now(),
    }
})
// cuando usamos arrow function tenemos acceso a la ventana global
// y cuando usamos function tenemos acceso al objeto actual (this)

// antes de almacenarlo en la base de datos
usuarioSchema.pre('save', async function ( next ) {
    // si ya esta hasheado no lo vuelve a hashear
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})


usuarioSchema.methods.comprobarPassword = async function( passwordFormulario ) {
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario