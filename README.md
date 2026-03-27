# Nexora Labs

منصة شركة برمجيات واستوديو منتجات رقمية مبنية بـ React + Node.js + Express + MongoDB، مع واجهة عامة عربية/إنجليزية، وضع `light/dark`، صفحات خدمات تفصيلية، ولوحة تحكم للإدارة.

## نظرة عامة

المشروع ينقسم إلى جزأين:

- `frontend/`: واجهة React تشمل الصفحة العامة، صفحات الخدمات، ولوحة التحكم.
- `backend/`: API بـ Express مع مصادقة JWT ونماذج MongoDB وإدارة بيانات الموقع.

الهوية الحالية للمشروع:

- الاسم: `Nexora Labs`
- الشعار النصي: `NX`
- الوصف المختصر: `Product Studio`
- بريد التواصل الافتراضي: `hello@nexoralabs.com`
- بريد الأدمن الافتراضي: `admin@nexoralabs.com`

## أهم المزايا الحالية

- واجهة عامة ثنائية اللغة `AR / EN`
- دعم كامل للوضعين `light / dark`
- صفحة رئيسية بتصميم حديث مع سكاشن خدمات، مشاريع، آراء العملاء، المميزات، مراحل التنفيذ، والتواصل
- صفحتا خدمة مخصصتان:
  - `تطوير مواقع الويب`
  - `تطوير تطبيقات الهاتف`
- قائمة تنقل علوية مع dropdown للخدمات وقائمة سريعة من زر الثلاث نقاط
- لوحة تحكم للإدارة:
  - تسجيل دخول
  - إدارة الخدمات
  - إدارة المشاريع
  - إدارة العملاء
  - إدارة آراء العملاء
  - إدارة الإحصائيات
  - متابعة طلبات التواصل
- دعم MongoDB حقيقية أو MongoDB داخل الذاكرة للتشغيل المحلي السريع

## هيكل المشروع

```text
nexora-labs/
├── backend/
│   ├── src/
│   │   ├── config/        # الاتصال بقاعدة البيانات + seed
│   │   ├── controllers/   # منطق الـ API
│   │   ├── middleware/    # الحماية والمصادقة
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── server.js      # نقطة تشغيل السيرفر
│   ├── .env
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/styles/
│   │   ├── components/
│   │   ├── content/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── docker-compose.yml
└── start-local.ps1
```

## التشغيل المحلي بدون Docker

### المتطلبات

- Node.js 18 أو أحدث
- npm

### تشغيل الـ backend

```powershell
cd backend
npm install
npm run dev
```

الـ backend يعمل افتراضيًا على:

```text
http://localhost:5000
powershell -ExecutionPolicy Bypass -File .\start-local.ps1
```

### تشغيل الـ frontend

```powershell
cd frontend
npm install
npm start
```

الـ frontend يعمل افتراضيًا على:

```text
http://localhost:3000
```

### تشغيل المشروع كاملًا بسكربت واحد

من جذر المشروع:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-local.ps1
```

السكربت يشغّل:

- `backend/npm run dev`
- `frontend/npm start`

ويحفظ اللوجز في:

- `backend-dev.out.log`
- `backend-dev.err.log`
- `frontend-dev.out.log`
- `frontend-dev.err.log`

## قاعدة البيانات

يدعم المشروع وضعين:

- MongoDB عادية عبر `MONGO_URI`
- MongoDB داخل الذاكرة عبر `USE_IN_MEMORY_DB=true`

عند استخدام قاعدة داخل الذاكرة:

- البيانات غير دائمة
- تختفي عند إيقاف الـ backend
- مفيدة للتطوير السريع والتجربة المحلية

اسم قاعدة البيانات الافتراضي الآن:

```text
nexora
```

## بيانات الدخول الافتراضية

| البريد | كلمة المرور |
|---|---|
| `admin@nexoralabs.com` | `Admin@123456` |

يفضّل تغيير كلمة المرور فور أول تسجيل دخول.

## متغيرات البيئة

### backend/.env.example

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/nexora
USE_IN_MEMORY_DB=false
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@nexoralabs.com
ADMIN_PASSWORD=Admin@123456
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
MAIL_FROM="Nexora Labs <hello@nexoralabs.com>"
CLIENT_URL=http://localhost:3000
```

### frontend/.env

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## أهم الـ Routes

### الواجهة العامة

- `/`
- `/services/web-applications`
- `/services/mobile-applications`
- `/admin/login`

### لوحة التحكم

- `/admin/dashboard`
- `/admin/contacts`
- `/admin/projects`
- `/admin/services`
- `/admin/testimonials`
- `/admin/clients`
- `/admin/stats`

## أهم API Endpoints

### عامة

- `GET /api/health`
- `GET /api/services`
- `GET /api/projects`
- `GET /api/testimonials`
- `GET /api/clients`
- `GET /api/stats`
- `POST /api/contacts`

### مصادقة

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/change-password`

### إدارة

- `GET /api/contacts`
- `PATCH /api/contacts/:id`
- `DELETE /api/contacts/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `POST /api/services`
- `PUT /api/services/:id`
- `DELETE /api/services/:id`
- `POST /api/testimonials`
- `PUT /api/testimonials/:id`
- `DELETE /api/testimonials/:id`
- `POST /api/clients`
- `PUT /api/clients/:id`
- `DELETE /api/clients/:id`
- `GET /api/stats/dashboard`
- `PUT /api/stats`

## التقنيات المستخدمة

### Frontend

- React 18
- React Router 6
- Axios
- CSS custom properties
- RTL/LTR support

### Backend

- Node.js
- Express.js
- Mongoose
- JWT
- bcryptjs
- Nodemailer

## الاختبارات والتحقق

تشغيل اختبارات الواجهة:

```powershell
cd frontend
$env:CI='true'; npm test -- --watch=false --runInBand
```

بناء نسخة الإنتاج للواجهة:

```powershell
cd frontend
npm run build
```

تشغيل seed يدويًا للباك:

```powershell
cd backend
npm run seed
```


## ملخص المشروع

هذا المشروع هو موقع شركة رقمية حديث مع لوحة تحكم داخلية، صُمم ليكون مناسبًا كشركة خدمات تقنية تعرض:

- خدمات تطوير مواقع الويب
- خدمات تطوير تطبيقات الهاتف
- مشاريع سابقة
- آراء العملاء
- نقاط القوة والمراحل التشغيلية
- وسيلة تواصل مباشرة مع العملاء

وفي الخلفية يوفّر API قابلة للإدارة والتوسعة لتحديث المحتوى والإحصائيات والعملاء والخدمات دون الحاجة لتعديل الواجهة يدويًا كل مرة.

**Nexora Labs © 2026**
