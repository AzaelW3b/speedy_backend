import Venta from '../models/Venta.js'
import mongoose from 'mongoose'

export const crearVenta = async (req, res) => {
  try {
    const venta = new Venta(req.body)
    venta.populate({ path: "clienteId" })
    await venta.save()
    res.json(venta)
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find({}).populate({ path: "clienteId" })
    res.json(ventas)

  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

export const actualizarVenta = async (req, res) => {
  const { clienteId, tipoMembresia, nivel, cashback, totalCompra } = req.body
  const nuevaVenta = {}

  if (clienteId) {
    nuevaVenta.clienteId = clienteId
  }

  if (tipoMembresia) {
    nuevaVenta.tipoMembresia = tipoMembresia
  }

  if (nivel) {
    nuevaVenta.nivel = nivel
  } else {
    if (req.body.nivel === 0) {
      nuevaVenta.nivel = 0
    }
  }
  if (cashback) {
    nuevaVenta.cashback = cashback
  } else {
    if (req.body.cashback === 0) {
      nuevaVenta.cashback = 0
    }
  }
  if (totalCompra) {
    nuevaVenta.totalCompra = totalCompra
  }
  console.log(nuevaVenta)
  try {
    let ventaExiste = await Venta.findById(req.params.id)

    if (!ventaExiste) {
      return res.status(404).json({ msg: 'Venta no encontrada' })
    }
    ventaExiste = await Venta.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevaVenta }, { new: true }).populate({ path: "clienteId" })
    res.json(ventaExiste)
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

export const obtenerVentasDelDia = async (req, res) => {
  try {
    const fechaInicio = new Date()
    fechaInicio.setHours(0, 0, 0, 0)
    const fechaFin = new Date()
    fechaFin.setHours(23, 59, 59, 999)

    const ventasDia = await Venta.find({
      fecha: {
        $gte: fechaInicio,
        $lte: fechaFin
      }
    })
    const cantidadVentas = ventasDia.length
    const totalVentasDia = ventasDia.reduce((total, venta) => total + venta.total, 0)

    res.json({ cantidadVentas, totalVentasDia })

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al obtener las ventas del dia' })
  }
}
// se obtienen las ventas por mes
export const obtenerVentaClienteId = async (req, res) => {
  try {
    const ventas = await Venta.aggregate([
      { $match: { clienteId: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $group: {
          _id: {
            month: { $month: '$fecha' },
            year: { $year: '$fecha' }
          },
          totalVentas: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'productos',
          localField: 'productoId',
          foreignField: '_id',
          as: 'productos'
        }
      },
      {
        $addFields: {
          totalCompraProductos: {
            $reduce: {
              input: '$productos',
              initialValue: 0,
              in: { $add: [{ $multiply: ['$cantidad', '$precio'] }, '$$value'] }
            }
          }
        }
      },
      {
        $group: {
          _id: {
            mes: '$_id.month',
            anio: '$_id.year'
          },
          ventasPorMes: {
            $push: {
              mes: '$_id.month',
              anio: '$_id.year',
              totalVentas: '$totalVentas',
              countVentas: '$count',
              productos: '$productos',
              totalCompraProductos: '$totalCompraProductos'
            }
          },
          totalVentas: { $sum: '$totalVentas' },
          totalCompraProductos: { $sum: '$totalCompraProductos' },
          totalCount: { $sum: '$count' }
        }
      }
    ])
    res.json(ventas)
  } catch (error) {
    console.log(error)
  }
}

// obtener las ventas de un cliente en especifico

export const obtenerVentasClienteId = async (req, res) => {
  try {
    const ventas = await Venta.find({ clienteId: req.params.id }).populate('clienteId')
    console.log(ventas)
    res.json(ventas)
  } catch (error) {
    console.log(error)
  }
}


export const eliminarVenta = async (req, res) => {
  try {
    let venta = await Venta.findById(req.params.id)

    if (!venta) {
      return res.status(404).json({ msg: 'Venta no encontrada' })
    }

    await Venta.findOneAndRemove({ _id: req.params.id })
    res.json({ msg: 'Venta eliminada' })

  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}