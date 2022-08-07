const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Reuniao extends Model {
    async findByUsuario(idUsuario, data) {
        const dataFinal = new Date(data + 'T00:00');
        dataFinal.setDate(dataFinal.getDate() + 1);
        const [results] = await sequelizeCon.query(`
                select 
                    reuniaos.descricao as "descReuniao", times.descricao as "descTime", "horaInicialReuniao", "horaFinalReuniao", usuarios.nome as "nomeUsuario" 
                from
                    reuniaos
                left join usuariotimes on
                    reuniaos."timeId" = usuariotimes."timeId"
                left join times on 
                	reuniaos."timeId" = times.id
                left join usuarios on
                    reuniaos."usuarioId" = usuarios.id     
                where
                    usuariotimes."usuarioId" = ${ idUsuario } 
                    and reuniaos."dataReuniao" >= '${data}'
                    and reuniaos."dataReuniao" < '${dataFinal.toISOString().substring(0,10)}'
                order by "horaInicialReuniao"`);
        return results;
    }
    async isTimeOcupadoNoPeriodo(timeId, data, horaInicial, horaFinal) {
        const dataFinal = new Date(data + 'T00:00');
        dataFinal.setDate(dataFinal.getDate() + 1);
        const [results] = await sequelizeCon.query(`
                select
                    *
                from
                    reuniaos
                where
                    "timeId" = ${timeId}
                    and "dataReuniao" >= '${data}'
                    and "dataReuniao" < '${dataFinal.toISOString().substring(0, 10)}'
                    and	('${horaInicial}' < "horaFinalReuniao" AND
                    '${horaFinal}' > "horaInicialReuniao") `);
        return results.length > 0;
    }
}

Reuniao.init({
    dataReuniao: DataTypes.DATE,
    horaInicialReuniao: DataTypes.TIME,
    horaFinalReuniao: DataTypes.TIME,
    descricao: DataTypes.STRING
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'reuniao',
    createdAt: false,
    updatedAt: false
}, true);

module.exports = { Reuniao };