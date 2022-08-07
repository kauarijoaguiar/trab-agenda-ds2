const { Router } = require('express');
const { isAuth } = require('../middlewares/is-auth');
const calendariosController = require('../controllers/calendario-controllers');

const routes = Router();

const calendarioController = new calendariosController();

routes.get('/', isAuth, calendarioController.listar);

routes.get('/cadastrar', isAuth, calendarioController.cadastro);

routes.post('/cadastrar', isAuth, calendarioController.cadastrar);

routes.get('/:data/', isAuth, calendarioController.listar);

routes.get('/:data/:idUsuario', isAuth, calendarioController.listar);

module.exports = routes;