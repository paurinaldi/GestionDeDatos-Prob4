const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('open25', 'pau', 'RadiumRocket', {
  dialect: 'mysql',
});

const MetodosPago = sequelize.define('MetodosPago', {
  Metodo: DataTypes.STRING,
},
{
  timestamps: false,
  freezeTableName: true
});

exports.Model = MetodosPago;