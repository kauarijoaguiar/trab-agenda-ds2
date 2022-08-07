const { Convite } = require("../models/Convite");
const { UsuarioTime } = require("../models/UsuarioTime");

class ConviteController {

    async listar(req, res) {
        const ConviteModel = new Convite();
        const convites = await ConviteModel.findAtivosByUsuario(req.session.usuario.id);
        return res.render('convite/index', { convites });
    }
    async Convite(req, res) {
        await Convite.update({ stativo: false }, { where: { id: req.params.id } })
        const convite = await Convite.findOne({
            where: {
                id: req.params.id
            },
        })
        if (req.body.resposta === 'Aceitar') {
            await UsuarioTime.create({
                timeId: convite.timeId,
                usuarioId: req.session.usuario.id
            });
        }
        return res.redirect('/convites')
    }
}

module.exports = ConviteController;