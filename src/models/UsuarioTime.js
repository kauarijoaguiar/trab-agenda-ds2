const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class UsuarioTime extends Model { }

UsuarioTime.init({
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'usuariotime',
    createdAt: 'created_at',
    updatedAt: false,
    timestamps: true
}, true);

module.exports = { UsuarioTime };