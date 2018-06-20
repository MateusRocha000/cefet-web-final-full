"use strict";
function isLoged(req, res, next) {
    if (req.session.userId && req.session) {
      return next();
    } else {
      let err = new Error('Você necessita estar logado para acessar esta pagina.');
      err.status = 401;
      return next(err);
    }
}