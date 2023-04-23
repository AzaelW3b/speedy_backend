import mongoose from 'mongoose'

const categoriaSchema = mongoose.Schema({
    nombreCategoria: {
        type: String,
        required: true,
        trim: true
    }
})

const Categoria = mongoose.model('Categoria', categoriaSchema)
export default Categoria