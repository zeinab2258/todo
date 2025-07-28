const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// بارگذاری متغیرهای محیطی از فایل .env
dotenv.config();

// وارد کردن مسیرهای API
const todoRoutes = require('./routes/todoRoutes');

// اتصال به دیتابیس MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // خروج از برنامه در صورت عدم اتصال به دیتابیس
    process.exit(1);
  }
};

connectDB();

const app = express();

// استفاده از middleware برای خواندن JSON از بدنه درخواست‌ها
app.use(express.json());

// تعریف مسیر اصلی API
app.get('/', (req, res) => {
  res.send('API is running...');
});

// استفاده از مسیرهای تعریف شده برای تسک‌ها
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});