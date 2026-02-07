# 🚀 دليل البدء السريع - EduHub

## 📋 نظرة سريعة

هذا الدليل سيساعدك على **البدء فوراً** في تطوير مشروع EduHub.

---

## ✅ قائمة التحقق قبل البدء

### 1. المتطلبات المثبتة

- [ ] Node.js 18+ ([تحميل](https://nodejs.org/))
- [ ] Python 3.10+ ([تحميل](https://www.python.org/))
- [ ] PostgreSQL 15+ ([تحميل](https://www.postgresql.org/))
- [ ] MongoDB 7+ ([تحميل](https://www.mongodb.com/))
- [ ] Redis 7+ ([تحميل](https://redis.io/))
- [ ] Git ([تحميل](https://git-scm.com/))
- [ ] VS Code أو IDE مفضل ([تحميل](https://code.visualstudio.com/))

### 2. الحسابات المطلوبة

- [ ] حساب GitHub (للكود)
- [ ] حساب OpenAI (للـ AI) - [التسجيل](https://platform.openai.com/)
- [ ] حساب AWS أو Cloudinary (للتخزين) - اختياري

---

## 🎯 خطوات البدء (5 دقائق)

### الخطوة 1: إنشاء هيكل المشروع

```bash
# إنشاء المجلد الرئيسي
mkdir eduhub
cd eduhub

# إنشاء المجلدات الفرعية
mkdir frontend backend ai-service docs docker scripts

# تهيئة Git
git init
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo "venv/" >> .gitignore
echo "__pycache__/" >> .gitignore
```

### الخطوة 2: إعداد Frontend (Next.js)

```bash
cd frontend

# إنشاء مشروع Next.js
npx create-next-app@latest . --typescript --tailwind --app --src-dir

# تثبيت المكتبات الأساسية
npm install zustand @tanstack/react-query axios socket.io-client
npm install react-hook-form zod @hookform/resolvers
npm install framer-motion recharts
npm install react-pdf qrcode.react html5-qrcode
npm install date-fns lucide-react react-hot-toast

# Dev Dependencies
npm install -D @types/node @types/react @types/react-dom
```

### الخطوة 3: إعداد Backend (Node.js)

```bash
cd ../backend

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
```

### الخطوة 4: إعداد AI Service (Python)

```bash
cd ../ai-service

# إنشاء بيئة افتراضية
python -m venv venv

# تفعيل البيئة الافتراضية
# في Windows:
venv\Scripts\activate
# في Mac/Linux:
source venv/bin/activate

# تثبيت المكتبات
pip install fastapi uvicorn
pip install openai langchain
pip install python-dotenv pydantic
pip install redis numpy scikit-learn

# إنشاء requirements.txt
pip freeze > requirements.txt
```

### الخطوة 5: إعداد قواعد البيانات

#### PostgreSQL

```bash
# إنشاء قاعدة البيانات
createdb eduhub

# أو من خلال psql:
psql -U postgres
CREATE DATABASE eduhub;
\q
```

#### MongoDB

```bash
# MongoDB ستنشئ قاعدة البيانات تلقائياً عند الاتصال الأول
# تأكد فقط من تشغيل خادم MongoDB
mongod
```

#### Redis

```bash
# تشغيل خادم Redis
redis-server
```

---

## 📝 إنشاء الملفات الأساسية

### Frontend: `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:5000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
```

### Backend: `.env`

```env
# Server
PORT=5000
NODE_ENV=development

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=eduhub
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

MONGODB_URI=mongodb://localhost:27017/eduhub

REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_REFRESH_SECRET=your-refresh-secret-key-change-this
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email (اختياري في البداية)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Storage (اختياري في البداية)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET=eduhub-files

# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

### AI Service: `.env`

```env
OPENAI_API_KEY=your-openai-api-key
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## 🏗️ البنية الأساسية للكود

### Frontend: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EduHub - المنصة الأكاديمية الذكية',
  description: 'منصة أكاديمية متكاملة للتعليم والتواصل',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### Frontend: `src/app/page.tsx`

```typescript
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          مرحباً بك في EduHub
        </h1>
        <p className="text-gray-600">
          المنصة الأكاديمية الذكية المتكاملة
        </p>
      </div>
    </main>
  )
}
```

### Backend: `src/app.ts`

```typescript
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/api/v1/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;
```

### Backend: `package.json` scripts

```json
{
  "scripts": {
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js",
    "test": "jest"
  }
}
```

### AI Service: `app/main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="EduHub AI Service")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "EduHub AI Service is running"}

@app.get("/health")
async def health():
    return {"status": "OK"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## 🎨 Tailwind CSS Configuration

### Frontend: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        secondary: {
          DEFAULT: "#7c3aed",
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
      },
      fontFamily: {
        sans: ["Inter", "Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## 🧪 اختبار الإعداد

### 1. اختبار Frontend

```bash
cd frontend
npm run dev
# افتح: http://localhost:3000
```

### 2. اختبار Backend

```bash
cd backend
npm run dev
# افتح: http://localhost:5000/api/v1/health
```

### 3. اختبار AI Service

```bash
cd ai-service
source venv/bin/activate  # أو venv\Scripts\activate في Windows
uvicorn app.main:app --reload
# افتح: http://localhost:8000/health
```

---

## 📚 الخطوات التالية

الآن بعد إعداد البيئة، يمكنك البدء في التطوير:

### الأسبوع 1-2: التصميم

1. ✅ راجع ملف `PROJECT_OVERVIEW.md`
2. ✅ راجع ملف `DATABASE_SCHEMA.md`
3. ✅ ابدأ في تصميم الواجهات (Figma)

### الأسبوع 3: البنية التحتية

1. ✅ أنشئ Database Models
2. ✅ أنشئ Migration Scripts
3. ✅ نفذ نظام المصادقة

### الأسبوع 4+: الميزات

1. ✅ اتبع `PROJECT_TIMELINE.md`
2. ✅ راجع `API_DOCUMENTATION.md` عند الحاجة
3. ✅ اختبر باستمرار

---

## 💡 نصائح مهمة

### 1. استخدم Git بشكل صحيح

```bash
# Commit بعد كل ميزة
git add .
git commit -m "feat: add user authentication"
git push origin main
```

### 2. اختبر باستمرار

- لا تنتظر حتى النهاية
- اختبر كل API بعد إنشائها
- استخدم Postman لاختبار APIs

### 3. وثق كل شيء

- اكتب تعليقات في الكود
- حدّث README عند الحاجة
- احتفظ بسجل للتغييرات

### 4. ابدأ صغيراً

- ركز على MVP أولاً
- لا تحاول تنفيذ كل شيء مرة واحدة
- أضف الميزات تدريجياً

### 5. اطلب المساعدة

- Stack Overflow
- GitHub Issues
- Discord Communities
- أساتذتك وزملائك

---

## 🛠️ أدوات مفيدة

### VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- Thunder Client (بديل Postman)
- MongoDB for VS Code
- PostgreSQL

### Chrome Extensions

- React Developer Tools
- Redux DevTools
- JSON Viewer

### أدوات أخرى

- **Postman**: لاختبار APIs
- **DBeaver**: لإدارة قواعد البيانات
- **Redis Commander**: لإدارة Redis
- **Figma**: للتصميم

---

## 🆘 حل المشاكل الشائعة

### مشكلة: Port already in use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### مشكلة: Cannot connect to database

- تأكد من تشغيل خادم قاعدة البيانات
- تحقق من بيانات الاتصال في `.env`
- تحقق من الـ firewall

### مشكلة: Module not found

```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install
```

### مشكلة: Python venv not working

```bash
# إعادة إنشاء البيئة الافتراضية
rm -rf venv
python -m venv venv
source venv/bin/activate  # أو venv\Scripts\activate
pip install -r requirements.txt
```

---

## 📞 الدعم

إذا واجهت أي مشاكل:

1. راجع التوثيق في مجلد `docs/`
2. ابحث في Google أو Stack Overflow
3. اسأل في Discord أو المجتمعات البرمجية
4. اطلب المساعدة من أساتذتك

---

## ✅ Checklist النهائي

قبل البدء في التطوير، تأكد من:

- [ ] جميع المتطلبات مثبتة
- [ ] قواعد البيانات تعمل
- [ ] Frontend يعمل على localhost:3000
- [ ] Backend يعمل على localhost:5000
- [ ] AI Service يعمل على localhost:8000
- [ ] Git repository جاهز
- [ ] قرأت جميع الوثائق
- [ ] لديك خطة واضحة للبدء

---

**الآن أنت جاهز للبدء! 🚀**

**بالتوفيق في مشروعك! 💪**
