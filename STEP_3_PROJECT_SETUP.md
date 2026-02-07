# 🚀 الخطوة 3: إنشاء هيكل المشروع - EduHub

## 🎉 تهانينا!

✅ **جميع قواعد البيانات تعمل بنجاح!**

- PostgreSQL: ✅ يعمل
- MongoDB: ✅ يعمل
- Redis: ⚠️ اختياري (سنضيفه لاحقاً)

**أنت الآن جاهز للبدء في التطوير!** 🚀

---

## 📁 هيكل المشروع المطلوب

```
Mo_pro/
├── frontend/                 # تطبيق Next.js
├── backend/                  # خادم Node.js/Express
├── ai-service/              # خدمة AI (Python/FastAPI)
├── docs/                    # التوثيق (موجود بالفعل ✅)
├── scripts/                 # سكريبتات مساعدة
├── .gitignore              # ملف Git ignore
├── README.md               # موجود بالفعل ✅
└── docker-compose.yml      # Docker (اختياري)
```

---

## 🎯 خطة العمل

### المرحلة 1: إنشاء المجلدات (5 دقائق)

شغل الأوامر التالية واحداً تلو الآخر:

```powershell
# إنشاء المجلدات الأساسية
mkdir frontend
mkdir backend
mkdir ai-service
mkdir scripts

# التحقق من الإنشاء
ls
```

---

### المرحلة 2: إعداد Frontend - Next.js (10 دقائق)

```powershell
# الانتقال لمجلد frontend
cd frontend

# إنشاء مشروع Next.js
npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-git

# عند السؤال:
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? Yes
# ✔ Would you like your code inside a `src/` directory? Yes
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to use Turbopack? No
# ✔ Would you like to customize the import alias? No

# تثبيت المكتبات الإضافية
npm install zustand @tanstack/react-query axios socket.io-client
npm install react-hook-form zod @hookform/resolvers
npm install framer-motion recharts
npm install react-pdf qrcode.react html5-qrcode
npm install date-fns lucide-react react-hot-toast

# العودة للمجلد الرئيسي
cd ..
```

---

### المرحلة 3: إعداد Backend - Node.js/Express (10 دقائق)

```powershell
# الانتقال لمجلد backend
cd backend

# تهيئة المشروع
npm init -y

# تثبيت المكتبات الأساسية
npm install express typescript ts-node @types/node @types/express
npm install mongoose pg typeorm reflect-metadata
npm install jsonwebtoken bcryptjs @types/jsonwebtoken @types/bcryptjs
npm install express-validator cors helmet dotenv
npm install socket.io redis ioredis
npm install multer nodemailer winston
npm install express-rate-limit

# Dev Dependencies
npm install -D nodemon @types/cors @types/multer @types/nodemailer
npm install -D jest @types/jest ts-jest supertest @types/supertest
npm install -D eslint prettier eslint-config-prettier

# إنشاء tsconfig.json
npx tsc --init

# العودة للمجلد الرئيسي
cd ..
```

---

### المرحلة 4: إعداد AI Service - Python/FastAPI (10 دقائق)

```powershell
# الانتقال لمجلد ai-service
cd ai-service

# إنشاء بيئة افتراضية
python -m venv venv

# تفعيل البيئة الافتراضية
.\venv\Scripts\activate

# تثبيت المكتبات
pip install fastapi uvicorn
pip install openai langchain
pip install python-dotenv pydantic
pip install redis numpy scikit-learn

# إنشاء requirements.txt
pip freeze > requirements.txt

# إلغاء تفعيل البيئة (مؤقتاً)
deactivate

# العودة للمجلد الرئيسي
cd ..
```

---

### المرحلة 5: إنشاء ملفات Git (5 دقائق)

```powershell
# تهيئة Git
git init

# إنشاء .gitignore
# (سأنشئه لك في الخطوة التالية)
```

---

## 📝 ملفات الإعداد المطلوبة

سأنشئ لك الملفات التالية:

### 1. `.gitignore`

لتجاهل الملفات غير الضرورية في Git

### 2. `frontend/.env.local`

متغيرات البيئة للـ Frontend

### 3. `backend/.env`

متغيرات البيئة للـ Backend

### 4. `backend/tsconfig.json`

إعدادات TypeScript للـ Backend

### 5. `backend/package.json` (scripts)

سكريبتات التشغيل

### 6. `ai-service/.env`

متغيرات البيئة للـ AI Service

### 7. `ai-service/app/main.py`

ملف البداية للـ AI Service

---

## 🎯 الخطوات التالية (بعد الإعداد)

بعد إنشاء الهيكل:

### 1. Frontend

- ✅ إنشاء نظام التصميم (Design System)
- ✅ إنشاء المكونات الأساسية (UI Components)
- ✅ إعداد Routing
- ✅ إعداد State Management

### 2. Backend

- ✅ إنشاء Database Models
- ✅ إنشاء API Routes
- ✅ إعداد Authentication
- ✅ إعداد Middleware

### 3. AI Service

- ✅ إعداد OpenAI Integration
- ✅ إنشاء Chat Endpoint
- ✅ إعداد Context Management

---

## ⏱️ الوقت المتوقع

- **إنشاء المجلدات**: 5 دقائق
- **إعداد Frontend**: 10-15 دقيقة
- **إعداد Backend**: 10-15 دقيقة
- **إعداد AI Service**: 10 دقائق
- **إنشاء ملفات الإعداد**: 5 دقائق

**الإجمالي**: 40-50 دقيقة

---

## 💡 نصائح مهمة

### 1. اتبع الترتيب

لا تقفز بين الخطوات - اتبعها بالترتيب

### 2. تحقق من كل خطوة

بعد كل أمر، تأكد من نجاحه قبل الانتقال للتالي

### 3. احفظ كلمات المرور

ستحتاج كلمة مرور PostgreSQL: `Emadsaad`

### 4. لا تقلق من الأخطاء

إذا ظهرت أخطاء، أخبرني وسأحلها معك

---

## 🚀 هل أنت جاهز؟

**الخيار 1**: أنا أنشئ كل شيء لك تلقائياً (أسرع) ✨

**الخيار 2**: أنت تنفذ الأوامر خطوة بخطوة (تعليمي) 📚

**الخيار 3**: نعمل معاً - أنا أنشئ الملفات وأنت تشغل الأوامر (موصى به) 🤝

---

**أخبرني أي خيار تفضل وسنبدأ فوراً!** 🚀
