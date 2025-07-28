const Todo = require('../models/Todo');

// @desc    گرفتن تمام تسک‌ها
// @route   GET /api/todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطای سرور' });
  }
};

// @desc    ایجاد یک تسک جدید
// @route   POST /api/todos
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    گرفتن یک تسک با شناسه
// @route   GET /api/todos/:id
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'تسک یافت نشد' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطای سرور' });
  }
};

// @desc    به‌روزرسانی یک تسک
// @route   PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // برگرداندن تسک آپدیت شده
      runValidators: true, // اجرای ولیدیشن‌های مدل
    });
    if (!todo) {
      return res.status(404).json({ success: false, error: 'تسک یافت نشد' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    حذف یک تسک
// @route   DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'تسک یافت نشد' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'خطای سرور' });
  }
};