const isAuth = (req, res, next) => {
    if (req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
    } 
    return res.status(403).redirect('/usuarios/login');
}

module.exports = { isAuth };
