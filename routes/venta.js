import express from 'express'
import { actualizarVenta, crearVenta, eliminarVenta, obtenerVentaClienteId, obtenerVentas, obtenerVentasDelDia } from '../controllers/ventaController.js'

const router = express.Router()

router.post('/', crearVenta)
router.get('/', obtenerVentas)
router.get('/ventasDia', obtenerVentasDelDia)
router.get('/ventasCliente/:id', obtenerVentaClienteId)
// router.get('/ventasMes/:id', obtenerProductosVendidosPorMes)
router.put('/:id', actualizarVenta)
router.delete('/:id', eliminarVenta)



export default router