# 🚀 EduHub - المشروع جاهز للانطلاق!

تم إعداد بيئة التطوير بالكامل بنجاح. إليك دليل التشغيل السريع.

## 🖥️ أوامر التشغيل

### 1. Backend (الخادم الرئيسي)

```powershell
cd backend
npm run dev
```

- **الرابط**: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)
- **فحص الصحة**: [http://localhost:5000/health](http://localhost:5000/health)

### 2. Frontend (واجهة المستخدم)

```powershell
cd frontend
npm run dev
```

- **الرابط**: [http://localhost:3000](http://localhost:3000)

### 3. AI Service (خدمة الذكاء الاصطناعي)

```powershell
cd ai-service
.\venv\Scripts\activate
uvicorn app.main:app --reload
```

- **الرابط**: [http://localhost:8000](http://localhost:8000)
- **Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📁 هيكل المشروع الحالي

```
Mo_pro/
├── frontend/          # Next.js 14 App Router
├── backend/           # Express.js + TypeScript
├── ai-service/        # FastAPI + Python
└── ...
```

## 🔑 حسابات التطوير

- **قاعدة البيانات**: `MoDB`
- **المستخدم**: `postgres`
- **كلمة المرور**: `Emadsaad`

---

## 🎯 الخطوة التالية المقترحة

البيدء في تطوير **نظام المصادقة (Authentication)**:

1. إنشاء نموذج المستخدم (User Model) في Backend.
2. إنشاء شاشة تسجيل الدخول في Frontend.
3. ربط Frontend مع Backend.
