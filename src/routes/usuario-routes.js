const { Router } = require('express');
const UsuariosController = require('../controllers/usuarios-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');
const { Usuario } = require('../models/Usuario');

const routes = Router();

const usuariosController = new UsuariosController();

routes.get('/perfil', isAuth, usuariosController.detalhar);

routes.get('/login', usuariosController.mostraLogin);

routes.get('/cadastro', usuariosController.mostraCadastro);

routes.get('/logout', usuariosController.logout);

routes.post('/login', usuariosController.login);

routes.get('/listagem', isAuth, async(req, res) => {
    const lista = await Usuario.findAll();
    return res.send(JSON.stringify(lista));
});

routes.post('/cadastrar', upload.single('imagem'), usuariosController.cadastrar);

module.exports = routes;