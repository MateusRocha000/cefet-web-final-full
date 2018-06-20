"use strict";
function isUser(req, res, next) {
    if (1) { //TO-DO ****
      return next();
    } else {
      let err = new Error('Você necessita ser o dono da pagina para editar.');
      err.status = 401;
      return next(err);
    }
}