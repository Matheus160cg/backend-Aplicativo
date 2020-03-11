/*
   ### "NESSE ARQUIVO FICA TODAS AS ROTAS DE TAREFA DA NOSSA API" ###
*/

const express = require('express');
const router = express.Router();

const TaskControllers = require('../controllers/TaskControllers')
const TaskValidation = require('../middleware/TaskValidation');

router.post('/', TaskValidation, TaskControllers.create);
router.get('/filter/all', TaskControllers.all);
router.get('/:id', TaskControllers.show);
router.put('/:id', TaskValidation, TaskControllers.update);
router.delete('/:id', TaskControllers.delete);

module.exports = router;