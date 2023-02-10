const { Sequelize, Op } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const Proveedores = require('./models/proveedores.js');
const Provincias = require('./models/provincias.js');
const Ciudades = require('./models/ciudades.js');
const Sucursales = require('./models/sucursales.js');
const Ventas = require('./models/ventas.js');
const MetodosPagoVenta = require('./models/metodoPagoVentas.js');
const MetodosPago = require('./models/metodoPago.js');
const Productos = require('./models/productos.js');
const CiudadesProductos = require('./models/ciudadesProductos.js');
const CiudadesProductosVentas = require('./models/ciudadesProductosVentas.js');




sequelize.authenticate().then(() => {
  console.log('Connection successful')
}).catch((err) => {
  console.log(err)
});


Provincias.Model.hasMany(Ciudades.Model, { foreignKey: 'idProvincia' })
Ciudades.Model.belongsTo(Provincias.Model, { foreignKey: 'idProvincia' })
Ciudades.Model.hasMany(Sucursales.Model, { foreignKey: 'idCiudad' })
Ciudades.Model.hasMany(Proveedores.Model, { foreignKey: 'idCiudad' })
Proveedores.Model.belongsTo(Ciudades.Model, { foreignKey: 'idCiudad' })
Sucursales.Model.belongsTo(Ciudades.Model, { foreignKey: 'idCiudad' })
Ventas.Model.belongsTo(Sucursales.Model, { foreignKey: 'idSucursal' })
Ventas.Model.belongsTo(MetodosPagoVenta.Model, { foreignKey: 'idMetodoPagoVenta' })
MetodosPagoVenta.Model.hasMany(Ventas.Model, { foreignKey: 'idMetodoPagoVenta' })
MetodosPagoVenta.Model.belongsTo(MetodosPago.Model, { foreignKey: 'idMetodoPago' })
MetodosPago.Model.hasMany(MetodosPagoVenta.Model, { foreignKey: 'idMetodoPago' })
Sucursales.Model.hasMany(Ventas.Model, { foreignKey: 'idSucursal' })

Ciudades.Model.hasMany(CiudadesProductos.Model, { foreignKey: 'idCiudad' })
Productos.Model.hasMany(CiudadesProductos.Model, { foreignKey: 'idProductos' })
CiudadesProductos.Model.belongsTo(Productos.Model, { foreignKey: 'idProductos' })
CiudadesProductos.Model.belongsTo(Ciudades.Model, { foreignKey: 'idCiudad' })
CiudadesProductos.Model.hasMany(CiudadesProductosVentas.Model, { foreignKey: 'idCiudadesProductos' })
CiudadesProductosVentas.Model.belongsTo(CiudadesProductos.Model, { foreignKey: 'idCiudadesProductos' })
Ventas.Model.hasMany(CiudadesProductosVentas.Model, { foreignKey: 'idVenta' })
CiudadesProductosVentas.Model.belongsTo(Ventas.Model, { foreignKey: 'idVenta' })

// Obtener una lista con la razón social de todos los proveedores en la provincia de Santa Fe

Proveedores.Model.findAll({
  attributes: ['RazonSocial'],
  include: {
    model: Ciudades.Model,
    attributes: [],
    required: true,
    include: [{ model: Provincias.Model, attributes: [], where: { Name: 'Santa Fe' } }],
  },
}).then((data) => {
  data.forEach((item) => {
    console.log(item.toJSON())
  })
}).catch((err) => {
  console.log(err);
});

// Obtener la cantidad de sucursales que hay en la ciudad de Rosario

Sucursales.Model.count({
  include:{
    model: Ciudades.Model,
    required: true,
    where: { Name: 'Rosario' },
  }
}).then((data) => {
    console.log(data)
}).catch((err) => {
  console.log(err);
});

// Consultar la cantidad de ventas que se abonaron con tarjeta de crédito el último mes

Ventas.Model.count({
  include:{
    model: MetodosPagoVenta.Model,
    required: true,
    include: [{
      model: MetodosPago.Model,
      where: { Metodo: 'Credito' },
    }]
  },
  where: { timeStamp: { [Op.between] : ['2022-12-01' , '2023-01-01' ] } }
}).then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(err);
});

// Consultar cuál fue el producto más vendido el último mes

Ventas.Model.findOne({
  attributes: [
    [Sequelize.fn('sum', Sequelize.col('CiudadesProductosVentas.Cantidad')), 'Total'],
  ],
  raw: true,
  subQuery: false,
  include: {
    model: CiudadesProductosVentas.Model,
    attributes: [],
    required: true,
    include: [
      {
        model: CiudadesProductos.Model,
        attributes: [],
        required: true,
        include: [{ model: Productos.Model, required: true, attributes: ['Nombre'] }],
      },
    ],
  },
  group: 'CiudadesProductosVentas.CiudadesProducto.Producto.id',
  order: [['Total', 'DESC']],
  where: { timeStamp: { [Op.between] : ['2022-12-01' , '2023-01-01' ] }  },
}).then((data) => {
    console.log(data)
  }).catch((err) => {
    console.log(err);
  });
