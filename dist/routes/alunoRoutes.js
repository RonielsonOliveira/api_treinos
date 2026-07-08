"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// LISTAR ALUNOS
router.get("/", _loginRequired2.default, _AlunoController2.default.index);

// CRIAR ALUNO
router.post("/", _loginRequired2.default, _AlunoController2.default.store);

// MOSTRAR UM ALUNO
router.get("/:id", _loginRequired2.default, _AlunoController2.default.show);

// ATUALIZAR
router.put("/:id", _loginRequired2.default, _AlunoController2.default.update);

// DELETAR
router.delete("/:id", _loginRequired2.default, _AlunoController2.default.delete);

exports. default = router;
