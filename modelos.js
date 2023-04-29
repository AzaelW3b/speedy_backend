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
  

  {
    "_id": "644c238797e8b3944761b51f",
    "codigoBarras": "7501005107013",
    "precio": 15,
    "categoria": "Sin categoria",
    "nombreProducto": "Big mix queso"
},
{
    "_id": "644c2450729acdad4f80fcad",
    "codigoBarras": "7500810005408",
    "nombreProducto": "Big mix fuego",
    "precio": 15,
    "categoria": "Sin categoria",
    
},
{
    "_id": "644c245f729acdad4f80fcaf",
    "codigoBarras": "7500810005057",
    "nombreProducto": "Pop karameladas 110g",
    "precio": 15,
    "categoria": "Sin categoria",
    
},
{
    "_id": "644c246e729acdad4f80fcb1",
    "codigoBarras": "7501000266234",
    "nombreProducto": "Chips jalapeño 170g",
    "precio": 42,
    "categoria": "Sin categoria",
    
},
{
    "_id": "644c247e729acdad4f80fcb3",
    "codigoBarras": "757528001889",
    "nombreProducto": "Chips Fuego 170g",
    "precio": 42,
    "categoria": "Sin categoria",
    
},
{
    "_id": "644c2680515e1e9f0c360599",
    "codigoBarras": "7501000266203",
    "nombreProducto": "Chips sal 170g",
    "precio": 42,
    "categoria": "Sin categoria",
    
}