"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Login required"],
    });
  }

  try {
    const dados = _jsonwebtoken2.default.verify(authorization, process.env.TOKEN_SECRET);
    const { id, email, role } = dados;

    //  LOGIN ADMIN / USER
    if (!role || role === "admin") {
      const user = await _User2.default.findOne({
        where: { id, email },
      });

      if (!user) {
        return res.status(401).json({
          errors: ["Usuário inválido"],
        });
      }

      req.userId = id;
      req.userEmail = email;
      req.userRole = "admin";

      return next();
    }

    //  LOGIN ALUNO
    if (role === "aluno") {
      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(401).json({
          errors: ["Aluno inválido"],
        });
      }

      req.userId = id;
      req.userRole = "aluno";

      return next();
    }

    return res.status(401).json({
      errors: ["Token inválido"],
    });
  } catch (error) {
    return res.status(401).json({
      errors: ["Login expirado ou inválido"],
    });
  }
};
