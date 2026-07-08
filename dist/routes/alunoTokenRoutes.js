"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AlunoTokenController = require('../controllers/AlunoTokenController'); var _AlunoTokenController2 = _interopRequireDefault(_AlunoTokenController);

const router = new (0, _express.Router)();
router.post("/", _AlunoTokenController2.default.store);
exports. default = router;
