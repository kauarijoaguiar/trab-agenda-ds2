const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Usuario extends Model {}

Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    // imagem: DataTypes.STRING
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'usuario',
    createdAt: 'created_at',
    updatedAt: false,
    timestamps: true
});

module.exports = { Usuario };