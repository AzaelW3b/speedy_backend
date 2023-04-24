const roles = {
    _id: Date.now(),
    rol: 'admin'
  }
  
  const usuarios = {
  
    _id: Date.now(),
    nombreUsuario: 'Azael Garcia Jaimes',
    correo: 'azaelweb1@gmail.com',
    password: 'speedy123',
    rol: 'admin'
  
  }
  
  // TODO: SISTEMA DE MEMBRESIAS
  const clientes = {
  
    _id: Date.now(),
    nombreCliente: 'Azael Garcia Jaimes',
    telefono: '229126123',
    correo: 'azaelweb1@gmail.com',
    fueInvitado: false,
    invitadoPorId: 'idCliente',
    clienteInvitadoUno: 'idCliente',
    clienteInvitadoDos: 'idCliente',
    clienteInvitadoTres: 'idCliente',
    password: 'speedy123',
    invitados: 0,
    rol: 'idRol'
  }
  
  const categorias = {
    _id: Date.now(),
    nombreCategoria: 'Enlatados'
  }
  
  const productos = {
    _id: Date.now(),
    codigoBarras: '7500810005453',
    nombreProducto: 'Sabritas adobadas',
    precio: 15,
    categoria: 'Botana'
  
  }
  
  const ventas = {
    _id: Date.now(),
    cliente: 'idCliente',
    productos: [{ _id: Date.now(), codigoBarras: '7500810005453', nombreProducto: 'Sabritas adobadas', precio: 15, categoria: 'Botana' }],
    total: 15,
    fecha: '23 DE MARZO 2023'
  }
  
  console.log(clientes)
  console.log(usuarios)
  console.log(roles)
  console.log(categorias)
  console.log(productos)
  console.log(ventas)
  