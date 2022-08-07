const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Time extends Model {}
    
Time.init({
    nome : DataTypes.STRING,
    descricao: DataTypes.STRING,
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'time',
    createdAt: false,
    updatedAt: false,
    timestamps: true
},true);

module.exports = { Time };