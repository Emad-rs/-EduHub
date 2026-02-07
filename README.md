# 🎓 EduHub - المنصة الأكاديمية الذكية المتكاملة

<div align="center">

![EduHub Logo](https://via.placeholder.com/200x200?text=EduHub)

**منصة أكاديمية شاملة تجمع التعليم والتواصل والذكاء الاصطناعي في مكان واحد**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org)

[المميزات](#-المميزات) •
[التقنيات](#-التقنيات-المستخدمة) •
[التثبيت](#-التثبيت) •
[الاستخدام](#-الاستخدام) •
[التوثيق](#-التوثيق) •
[المساهمة](#-المساهمة)

</div>

---

## 📋 نظرة عامة

**EduHub** هي منصة أكاديمية متكاملة مصممة خصيصاً لكليات تقنية المعلومات. تجمع المنصة بين:

- 🤖 **مساعد ذكي** يعتمد على GPT-4 للإجابة على الأسئلة ومساعدة الطلاب
- 📚 **مكتبة رقمية** شاملة مع قارئ PDF متقدم
- 💬 **منصة تواصل أكاديمية** للنقاش ومشاركة المعرفة
- 🎉 **إدارة الأنشطة الطلابية** مع نظام نقاط وشارات
- ✅ **نظام حضور ذكي** باستخدام QR Code
- 📊 **لوحات تحكم تحليلية** للطلاب والأساتذة والإداريين

---

## ✨ المميزات

### للطلاب 👨‍🎓

- ✅ الوصول السريع لجميع الموارد التعليمية
- ✅ مساعد ذكي متاح 24/7 للإجابة على الأسئلة
- ✅ قراءة الكتب أونلاين مع حفظ التقدم
- ✅ التواصل مع الزملاء والأساتذة
- ✅ المشاركة في الأنشطة وكسب النقاط
- ✅ تتبع الحضور والأداء الأكاديمي
- ✅ توصيات مخصصة بناءً على الاهتمامات

### للأساتذة 👨‍🏫

- ✅ إدارة المواد الدراسية بسهولة
- ✅ متابعة حضور وأداء الطلاب
- ✅ نشر المحتوى التعليمي والإعلانات
- ✅ التواصل الفعال مع الطلاب
- ✅ تحليلات وإحصائيات مفصلة
- ✅ نظام حضور تلقائي بـ QR Code

### للإداريين 👨‍💼

- ✅ إدارة شاملة للمستخدمين والصلاحيات
- ✅ متابعة الإحصائيات العامة للمنصة
- ✅ إدارة الأنشطة والفعاليات
- ✅ إدارة المكتبة الرقمية
- ✅ توليد تقارير شاملة
- ✅ مراقبة استخدام المنصة

---

## 🛠️ التقنيات المستخدمة

### Frontend

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Charts**: Recharts
- **PDF Viewer**: React-PDF
- **QR Code**: html5-qrcode, qrcode.react

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: JWT
- **Validation**: Express Validator
- **File Upload**: Multer
- **Email**: Nodemailer
- **Real-time**: Socket.io
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

### AI Service

- **Framework**: FastAPI (Python)
- **AI Model**: OpenAI GPT-4
- **NLP**: LangChain
- **Vector DB**: (اختياري)

### Databases

- **PostgreSQL**: للبيانات المنظمة (Users, Books, Attendance)
- **MongoDB**: للبيانات المرنة (Posts, Messages, Notifications)
- **Redis**: للتخزين المؤقت والجلسات
- **Elasticsearch**: للبحث المتقدم

### DevOps

- **Containerization**: Docker, Docker Compose
- **Version Control**: Git, GitHub
- **CI/CD**: GitHub Actions
- **Testing**: Jest, Cypress
- **Linting**: ESLint, Prettier

---

## 📁 هيكل المشروع

```
eduhub/
├── frontend/                 # تطبيق Next.js
│   ├── src/
│   │   ├── app/             # App Router
│   │   ├── components/      # React Components
│   │   ├── lib/             # Utilities
│   │   ├── hooks/           # Custom Hooks
│   │   ├── store/           # State Management
│   │   └── types/           # TypeScript Types
│   └── public/              # Static Files
│
├── backend/                  # خادم Node.js
│   ├── src/
│   │   ├── config/          # Configuration
│   │   ├── controllers/     # Controllers
│   │   ├── models/          # Database Models
│   │   ├── routes/          # API Routes
│   │   ├── middleware/      # Middleware
│   │   ├── services/        # Business Logic
│   │   └── utils/           # Utilities
│   └── tests/               # Tests
│
├── ai-service/              # خدمة AI (Python)
│   ├── app/
│   │   ├── api/            # FastAPI Routes
│   │   ├── models/         # AI Models
│   │   └── services/       # AI Services
│   └── tests/              # Tests
│
├── docs/                    # التوثيق
│   ├── PROJECT_OVERVIEW.md
│   ├── TECHNICAL_REQUIREMENTS.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   └── PROJECT_TIMELINE.md
│
├── docker/                  # Docker Files
│   └── docker-compose.yml
│
└── README.md               # هذا الملف
```

---

## 🚀 التثبيت

### المتطلبات الأساسية

- **Node.js**: 18.0.0 أو أحدث
- **Python**: 3.10 أو أحدث
- **PostgreSQL**: 15 أو أحدث
- **MongoDB**: 7.0 أو أحدث
- **Redis**: 7.0 أو أحدث
- **Docker** (اختياري): للتشغيل بالحاويات

### التثبيت اليدوي

#### 1. استنساخ المشروع

```bash
git clone https://github.com/yourusername/eduhub.git
cd eduhub
```

#### 2. إعداد Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# قم بتعديل .env.local بالإعدادات المناسبة
npm run dev
```

#### 3. إعداد Backend

```bash
cd backend
npm install
cp .env.example .env
# قم بتعديل .env بالإعدادات المناسبة
npm run dev
```

#### 4. إعداد AI Service

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # في Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# قم بتعديل .env بالإعدادات المناسبة
uvicorn app.main:app --reload
```

#### 5. إعداد قواعد البيانات

```bash
# PostgreSQL
createdb eduhub
cd backend
npm run migrate

# MongoDB - يتم إنشاؤها تلقائياً عند أول اتصال

# Redis - تأكد من تشغيل خادم Redis
redis-server
```

### التثبيت باستخدام Docker

```bash
# استنساخ المشروع
git clone https://github.com/yourusername/eduhub.git
cd eduhub

# إعداد ملفات البيئة
cp .env.example .env
# قم بتعديل .env بالإعدادات المناسبة

# تشغيل جميع الخدمات
docker-compose up -d

# عرض السجلات
docker-compose logs -f

# إيقاف الخدمات
docker-compose down
```

---

## 💻 الاستخدام

### تشغيل المشروع في بيئة التطوير

#### Frontend

```bash
cd frontend
npm run dev
# يعمل على: http://localhost:3000
```

#### Backend

```bash
cd backend
npm run dev
# يعمل على: http://localhost:5000
```

#### AI Service

```bash
cd ai-service
source venv/bin/activate
uvicorn app.main:app --reload
# يعمل على: http://localhost:8000
```

### البناء للإنتاج

#### Frontend

```bash
cd frontend
npm run build
npm start
```

#### Backend

```bash
cd backend
npm run build
npm start
```

#### AI Service

```bash
cd ai-service
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## 🧪 الاختبار

### Frontend Tests

```bash
cd frontend
npm run test              # Unit tests
npm run test:e2e          # E2E tests (Cypress)
npm run test:coverage     # Coverage report
```

### Backend Tests

```bash
cd backend
npm run test              # Unit tests
npm run test:integration  # Integration tests
npm run test:coverage     # Coverage report
```

### AI Service Tests

```bash
cd ai-service
pytest
pytest --cov=app          # Coverage report
```

---

## 📚 التوثيق

الوثائق الكاملة متوفرة في مجلد `docs/`:

- **[نظرة عامة على المشروع](docs/PROJECT_OVERVIEW.md)**: وصف شامل للمشروع والميزات
- **[المتطلبات التقنية](docs/TECHNICAL_REQUIREMENTS.md)**: التقنيات والمتطلبات الوظيفية
- **[تصميم قاعدة البيانات](docs/DATABASE_SCHEMA.md)**: مخططات قواعد البيانات
- **[توثيق API](docs/API_DOCUMENTATION.md)**: جميع نقاط النهاية والأمثلة
- **[خطة العمل](docs/PROJECT_TIMELINE.md)**: الجدول الزمني التفصيلي

### API Documentation (Swagger)

بعد تشغيل Backend، يمكنك الوصول إلى توثيق API التفاعلي:

```
http://localhost:5000/api-docs
```

---

## 🔐 المتغيرات البيئية

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:5000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
```

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=eduhub
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

MONGODB_URI=mongodb://localhost:27017/eduhub

REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password

# Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=eduhub-files

# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

### AI Service (.env)

```env
OPENAI_API_KEY=your-openai-api-key
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. **Fork** المشروع
2. إنشاء **Branch** جديد (`git checkout -b feature/AmazingFeature`)
3. **Commit** التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. **Push** إلى Branch (`git push origin feature/AmazingFeature`)
5. فتح **Pull Request**

### معايير الكود

- اتبع ESLint و Prettier configurations
- اكتب اختبارات للميزات الجديدة
- وثق الكود بشكل جيد
- اتبع Conventional Commits

---

## 📝 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

## 👥 الفريق

- **المطور الرئيسي**: [اسمك]
- **المشرف**: [اسم المشرف]
- **الكلية**: كلية تقنية المعلومات

---

## 🙏 شكر وتقدير

- [Next.js](https://nextjs.org/) - إطار عمل React
- [OpenAI](https://openai.com/) - GPT-4 API
- [Tailwind CSS](https://tailwindcss.com/) - إطار عمل CSS
- [Socket.io](https://socket.io/) - Real-time Communication
- جميع المكتبات والأدوات مفتوحة المصدر المستخدمة

---

## 📞 الدعم

إذا كان لديك أي أسئلة أو مشاكل:

- 📧 **Email**: your-email@example.com
- 💬 **Discord**: [رابط Discord]
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/eduhub/issues)

---

## 🗺️ خارطة الطريق

### الإصدار 1.0 (الحالي)

- ✅ نظام المستخدمين والمصادقة
- ✅ المكتبة الرقمية
- ✅ منصة التواصل
- ✅ المساعد الذكي
- ✅ نظام الأنشطة
- ✅ نظام الحضور

### الإصدار 1.1 (المستقبل)

- ⏳ تطبيق موبايل (React Native)
- ⏳ نظام الامتحانات الإلكترونية
- ⏳ مؤتمرات فيديو مدمجة
- ⏳ نظام إدارة المشاريع
- ⏳ تكامل مع أنظمة الجامعة

### الإصدار 2.0 (المستقبل البعيد)

- ⏳ تحليلات AI متقدمة
- ⏳ توصيات مسار تعليمي مخصص
- ⏳ نظام Peer-to-Peer Learning
- ⏳ Blockchain للشهادات

---

## 📊 الإحصائيات

![GitHub stars](https://img.shields.io/github/stars/yourusername/eduhub?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/eduhub?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/eduhub)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/eduhub)

---

<div align="center">

**صُنع بـ ❤️ في السعودية**

**مشروع تخرج - كلية تقنية المعلومات**

**2026**

</div>
#   - E d u H u b  
 