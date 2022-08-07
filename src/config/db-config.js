const { Sequelize } = require('sequelize');

const sequelizeCon = new Sequelize('postgres://postgres:Kauarijo04*@localhost:5432/agendatrabalho', {
    dialectOptions: {
        // ssl: {
        //     require: true,
        //     rejectUnauthorized: false
        // }
    },
});

module.exports = { sequelizeCon };