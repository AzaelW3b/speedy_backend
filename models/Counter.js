import mongoose from 'mongoose'

const counterSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
})
export default mongoose.model('Counter', counterSchema)
