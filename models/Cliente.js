import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const clienteSchema = mongoose.Schema({
  nombreCliente: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  correo: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  invitadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
  },
  invitados: [
    {
      cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
      },
      nivel: {
        type: Number,
        default: 1
      },
    },
  ],
  rol: {
    type: String,
    trim: true,
  },
  tipoMembresia: {
    type: String,
    trim: true,
  },
  niveles: {
    type: Number,
    default: 0,
  },
})

clienteSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

clienteSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password)
}

const Cliente = mongoose.model('Cliente', clienteSchema)

export default Cliente
