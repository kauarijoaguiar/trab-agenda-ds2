const { Router } = require('express');
const TimesController = require('../controllers/times-controllers');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');

const routes = Router();

const timesController = new TimesController();

routes.get('/', isAuth, timesController.listar);

routes.get('/cadastrar', isAuth, timesController.cadastro);

routes.post('/cadastrar', isAuth, timesController.cadastrar);

routes.get('/:id', isAuth, timesController.perfil);


module.exports = routes;