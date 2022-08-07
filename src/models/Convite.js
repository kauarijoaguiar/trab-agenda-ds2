const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Convite extends Model {
    async findAtivosByUsuario(idUsuario) {
        const [results] = await sequelizeCon.query(`
        select
            convites.created_at as "dataConvite",
            times.nome as "descTime",
            usuarios.nome as "nomeUsuario",
            convites.id
        from
            convites
        left join times on
            convites."timeId" = times.id
        left join usuarios on
            times."usuarioId" = usuarios.id
        where
            convites."usuarioId" = ${idUsuario}
            and stativo = true`);
        return results;
    }
}

Convite.init({
    stativo: DataTypes.BOOLEAN,
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'convite',
    createdAt: 'created_at',
    updatedAt: false,
    timestamps: true
}, true);

module.exports = { Convite };