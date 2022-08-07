const bcrypt = require('bcrypt');
const { restart } = require('nodemon');
const { Time } = require('../models/Time');
const { Usuario } = require('../models/Usuario');


class UsuariosController {
    async detalhar(req, res) {

        const usuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        })
        return res.render('usuario/perfil', { usuario });
    }
    async mostraLogin(req, res) {
        return res.render('usuario/login');
    }

    async mostraCadastro(req, res) {
        return res.render('usuario/cadastro');
    }

    async logout(req, res) {
        req.session.usuario = null;
        return res.redirect('/usuarios/login');
    }


    async cadastrar(req, res) {
        console.log('UsuariosController/cadastrar', req.body);

        const usuarioEcontrado = await Usuario.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!usuarioEcontrado) {
            const usuarioBody = req.body;
            const senha = bcrypt.hashSync(usuarioBody.senha, 10);


            const usuario = {
                nome: usuarioBody.nome,
                email: usuarioBody.email,
                senha
            }

            const user = await Usuario.create(usuario);

            req.session.usuario = user;
            res.redirect('/times');
        } else {
            return res.send('Já existe usuário cadastrado com esse email..');
        }
    }

    async login(req, res) {

        const { email, senha } = req.body;
        const usuarioEcontrado = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!usuarioEcontrado) return res.send('Usuario nao encontrado');

        const confere = bcrypt.compareSync(senha, usuarioEcontrado.senha);

        if (confere) {
            req.session.usuario = usuarioEcontrado;
            res.redirect('/times');
        } else {
            return res.send('Senha nao confere...');
        }

    }
}

module.exports = UsuariosController;