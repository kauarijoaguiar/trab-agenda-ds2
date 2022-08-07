const { sequelizeCon } = require("../config/db-config");
const { Convite } = require("./Convite");
const { Reuniao } = require("./Reuniao");
const { Time } = require("./Time");
const { Usuario } = require("./Usuario");
const { UsuarioTime } = require("./UsuarioTime");

Time.belongsTo(Usuario);
Time.hasMany(Convite);
Time.hasMany(Reuniao);
Time.hasMany(UsuarioTime);

Usuario.hasMany(Time);
Usuario.hasMany(Convite);
Usuario.hasMany(Reuniao);
Usuario.hasMany(UsuarioTime);

Convite.belongsTo(Time);
Convite.belongsTo(Usuario);

Reuniao.belongsTo(Usuario);
Reuniao.belongsTo(Time);

UsuarioTime.belongsTo(Usuario);
UsuarioTime.belongsTo(Time);

sequelizeCon.sync();

