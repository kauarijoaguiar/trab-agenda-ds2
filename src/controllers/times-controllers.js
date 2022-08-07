const { Time } = require('../models/Time');
const { Usuario } = require('../models/Usuario');
const { UsuarioTime } = require('../models/UsuarioTime');
const { Convite } = require('../models/Convite');

class TimesController {

    async cadastrar(req, res) {
        const time = await Time.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            usuarioId: req.session.usuario.id
        });

        const usuarioTime = await UsuarioTime.create({
            timeId: time.id,
            usuarioId: req.session.usuario.id
        });

        if (req.body.membros) {
            for (let membro of req.body.membros) {
                const convite = await Convite.create({
                    timeId: time.id,
                    usuarioId: membro,
                    stativo: true
                });
            }
        }

        res.redirect('/times');
    }

    async listar(req, res) {
        const times = await Time.findAll({
            include: [{
                model: UsuarioTime,
                where: {
                    usuarioId: req.session.usuario.id
                },
                required: true
            }]
        });
        return res.render('time/listagem', { times });
    }

    async cadastro(req, res) {
        const usuarios = (await Usuario.findAll()).filter(function(usuario) {
            return usuario.id !== req.session.usuario.id;
        });
        return res.render('time/cadastro', { usuarios });
    }

    async perfil(req, res) {
        const time = await Time.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Usuario,
                required: false
            }]
        })
        const membros = await UsuarioTime.findAll({
            where: {
                timeId: req.params.id
            },
            include: [{
                model: Usuario,
                required: false
            }]
        })
        return res.render('time/perfil', { time, membros });
    }



}

module.exports = TimesController;