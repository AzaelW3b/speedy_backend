import mongoose from 'mongoose'

const rolSchema = mongoose.Schema({
    rol: {
        type: String,
        required: true,
        trim: true
    }
})

const Rol = mongoose.model('Rol', rolSchema)

export default Rol