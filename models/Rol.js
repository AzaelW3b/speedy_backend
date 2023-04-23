import mongoose from 'mongoose'

const rolSchema = mongoose.Schema({
    nombreRol: {
        type: String,
        required: true,
        trim: true
    }
})

const Rol = mongoose.model('Rol', rolSchema)

export default Rol