const { Router } = require('express');
const { isAuth } = require('../middlewares/is-auth');
const convitesController = require('../controllers/convite-controllers');

const routes = Router();

const conviteController = new convitesController();

routes.get('/', isAuth, conviteController.listar);

routes.post('/:id', isAuth, conviteController.Convite);

module.exports = routes;