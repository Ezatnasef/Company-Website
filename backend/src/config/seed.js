const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('./db');

const User = require('../models/User.model');
const Service = require('../models/Service.model');
const Project = require('../models/Project.model');
const Testimonial = require('../models/Testimonial.model');
const Client = require('../models/Client.model');
const Stats = require('../models/Stats.model');

const services = [
  { title: 'برمجة وتصميم المواقع الإلكترونية', description: 'نصمم مواقع إلكترونية تجمع بين الشكل القوي والأداء السريع والتجربة السلسة.', icon: '🌐', category: 'web', order: 1 },
  { title: 'برمجة وتصميم تطبيقات الجوال', description: 'نطور تطبيقات iOS وAndroid بتجربة استخدام واضحة وقابلة للتوسع.', icon: '📱', category: 'app', order: 2 },
  { title: 'الصيانة والدعم الفني', description: 'دعم وصيانة دورية للحفاظ على استقرار مشروعك ومعالجة المشاكل بسرعة.', icon: '🔧', category: 'support', order: 3 },
  { title: 'التسويق الرقمي', description: 'حملات وتحسين ظهور رقمي تساعدك على الوصول لعملائك بشكل أدق.', icon: '📊', category: 'marketing', order: 4 },
  { title: 'الذكاء الاصطناعي', description: 'دمج حلول الذكاء الاصطناعي لتحسين الأتمتة وتجربة المستخدم واتخاذ القرار.', icon: '🤖', category: 'ai', order: 5 },
  { title: 'الأمن والحماية الرقمية', description: 'تحسين أمان التطبيقات والأنظمة مع ممارسات حماية ونسخ احتياطي مناسبة.', icon: '🛡️', category: 'web', order: 6 },
];

const projects = [
  { title: 'آل ساري للسيارات', description: 'منصة رقمية متكاملة لعرض السيارات والخدمات المرتبطة بها.', category: 'app', emoji: '🚗', featured: true, order: 1 },
  { title: 'اسبتالية', description: 'منصة خدمات صحية إلكترونية بواجهة استخدام عصرية.', category: 'web', emoji: '🏥', featured: true, order: 2 },
  { title: 'غزال لإدارة المواقف', description: 'نظام ذكي لحجز وإدارة مواقف السيارات والدفع بسهولة.', category: 'app', emoji: '🅿️', featured: false, order: 3 },
  { title: 'رابل الزراعية', description: 'موقع يعرض منتجات زراعية وخدمات مرتبطة بها بطريقة تجارية واضحة.', category: 'web', emoji: '🌱', featured: false, order: 4 },
  { title: 'منصور للذبائح', description: 'تطبيق لتسهيل الطلب والتوصيل لخدمات الذبائح واللحوم.', category: 'app', emoji: '🥩', featured: false, order: 5 },
  { title: 'نادي أبها الرياضي', description: 'موقع رسمي يعرض الأخبار والفعاليات والمحتوى الخاص بالنادي.', category: 'web', emoji: '🏆', featured: true, order: 6 },
];

const testimonials = [
  { name: 'أ. سلطان الفيفي', role: 'مؤسس منصة 93 سيارة', avatar: 'س', youtubeId: 'cVvu9w6W3Tk', order: 1 },
  { name: 'أ. محمد عراقي', role: 'مسؤول تسويق شركة رابل الزراعية', avatar: 'م', youtubeId: 'ZDj2D-kAAUo', order: 2 },
  { name: 'أ. محمد الكثيري', role: 'المدير التنفيذي لشركة الكثيري', avatar: 'م', youtubeId: 'R8BUi3IupQ0', order: 3 },
  { name: 'أ. عبد العزيز النصيري', role: 'المدير التنفيذي لمنصة بلاتين', avatar: 'ع', youtubeId: '80nWRxKv-n4', order: 4 },
  { name: 'أ. أحمد مفرح', role: 'مدير التسويق في شركة الخليج للسيارات', avatar: 'أ', youtubeId: 'R-rPhhjtdWM', order: 5 },
];

const clients = [
  { name: 'كود كار للسيارات', order: 1 },
  { name: 'الكثيري للسيارات', order: 2 },
  { name: 'المطيري للسيارات', order: 3 },
  { name: 'صالح للسيارات', order: 4 },
  { name: 'هامات العقارية', order: 5 },
  { name: 'مجمع الأسرة الخليجي الطبي', order: 6 },
  { name: 'منصة بلاتين', order: 7 },
  { name: 'كشفية', order: 8 },
  { name: 'منصور للذبائح', order: 9 },
  { name: 'اسبتالية', order: 10 },
];

const seedDatabase = async ({ clearExisting = true } = {}) => {
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }

  if (clearExisting) {
    await Promise.all([
      User.deleteMany(),
      Service.deleteMany(),
      Project.deleteMany(),
      Testimonial.deleteMany(),
      Client.deleteMany(),
      Stats.deleteMany(),
    ]);
  }

  if (!await User.countDocuments()) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123456', 10);
    await User.create({
      name: 'Admin Nexora Labs',
      email: process.env.ADMIN_EMAIL || 'admin@nexoralabs.com',
      password: hash,
      role: 'admin',
    });
  }

  if (!await Service.countDocuments()) {
    await Service.insertMany(services);
  }

  if (!await Project.countDocuments()) {
    await Project.insertMany(projects);
  }

  if (!await Testimonial.countDocuments()) {
    await Testimonial.insertMany(testimonials);
  }

  if (!await Client.countDocuments()) {
    await Client.insertMany(clients);
  }

  if (!await Stats.countDocuments()) {
    await Stats.create({
      workHours: 253440,
      coffeeCups: 73370,
      projects: 307,
      yearsExperience: 10,
    });
  }
};

if (require.main === module) {
  seedDatabase({ clearExisting: true })
    .then(() => {
      console.log('Database seeded successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
