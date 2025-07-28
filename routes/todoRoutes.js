const express = require('express');
const {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const router = express.Router();

// مسیر برای گرفتن همه تسک‌ها و ایجاد تسک جدید
router.route('/')
  .get(getTodos)
  .post(createTodo);

// مسیر برای گرفتن، آپدیت و حذف یک تسک خاص با شناسه
router.route('/:id')
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;