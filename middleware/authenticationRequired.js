'use strict';

//Verifica se o usuario está logado ao acessar uma pagina
module.exports = function(req, res, next) {
  if (req.session.userId && req.session) {
    return next();
  } else {
    let err = new Error('Você necessita estar logado para acessar esta pagina.');
    err.status = 401;
    return next(err);
  }
}