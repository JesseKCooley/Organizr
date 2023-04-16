const express = require('express');


const {
    getAllTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.use(requireAuth)

router.get('/',getAllTodos);

router.get('/:id',getTodo);

router.post('/',createTodo);

router.delete('/:id',deleteTodo);

router.patch('/:id',updateTodo);

module.exports = router;