# 🧪 دليل اختبار قواعد البيانات - الخطوة 2

## ✅ ما تم إنجازه

- [x] ✅ تثبيت PostgreSQL
- [x] ✅ إنشاء قاعدة البيانات `MoDB`

---

## 🎯 الخطوة 2: اختبار الاتصال بقواعد البيانات

### الخطوات:

#### 1. تثبيت المكتبات المطلوبة

افتح Terminal في مجلد المشروع وشغل:

```powershell
npm install
```

هذا سيثبت:

- `pg` - للاتصال بـ PostgreSQL
- `mongodb` - للاتصال بـ MongoDB
- `redis` - للاتصال بـ Redis (اختياري)

---

#### 2. تحديث كلمة المرور

افتح ملف `test-database-connection.js` وعدّل السطر 32:

```javascript
password: 'YOUR_PASSWORD', // ⚠️ غير هذا بكلمة المرور الخاصة بك
```

**استبدل `YOUR_PASSWORD` بكلمة المرور التي اخترتها عند تثبيت PostgreSQL**

---

#### 3. تشغيل الاختبار

```powershell
npm test
```

أو:

```powershell
node test-database-connection.js
```

---

## 📊 النتائج المتوقعة

### ✅ إذا كان كل شيء يعمل:

```
═══════════════════════════════════════════════
🧪 اختبار الاتصال بقواعد البيانات - EduHub
═══════════════════════════════════════════════

📊 اختبار الاتصال بـ PostgreSQL...
✅ الاتصال بـ PostgreSQL نجح!
📌 إصدار PostgreSQL: PostgreSQL 16.x
✅ تم إنشاء جدول اختبار بنجاح
✅ تم إدراج بيانات تجريبية
✅ تم قراءة 1 سجل من الجدول
✅ تم حذف الجدول التجريبي

📊 اختبار الاتصال بـ MongoDB...
✅ الاتصال بـ MongoDB نجح!
✅ تم إدراج مستند تجريبي
✅ عدد المستندات: 1
✅ تم حذف المجموعة التجريبية

📊 اختبار الاتصال بـ Redis...
⚠️  Redis غير متوفر (اختياري)

═══════════════════════════════════════════════
📊 ملخص النتائج:
═══════════════════════════════════════════════
PostgreSQL: ✅ يعمل
MongoDB:    ✅ يعمل
Redis:      ⚠️  غير متوفر (اختياري)

🎉 رائع! جميع قواعد البيانات الضرورية تعمل بنجاح!
✅ أنت جاهز للبدء في تطوير المشروع!
```

---

## ⚠️ حل المشاكل الشائعة

### مشكلة 1: خطأ في كلمة المرور PostgreSQL

```
❌ خطأ في الاتصال بـ PostgreSQL:
   password authentication failed for user "postgres"
💡 نصيحة: كلمة المرور غير صحيحة
```

**الحل:**

- تأكد من كلمة المرور في ملف `test-database-connection.js`
- أو أعد تعيين كلمة المرور:
  ```powershell
  psql -U postgres
  ALTER USER postgres PASSWORD 'new_password';
  ```

---

### مشكلة 2: قاعدة البيانات غير موجودة

```
❌ خطأ في الاتصال بـ PostgreSQL:
   database "MoDB" does not exist
💡 نصيحة: قاعدة البيانات "MoDB" غير موجودة
```

**الحل:**

```powershell
# اتصل بـ PostgreSQL
psql -U postgres

# أنشئ قاعدة البيانات
CREATE DATABASE "MoDB";

# تحقق من الإنشاء
\l

# اخرج
\q
```

---

### مشكلة 3: PostgreSQL غير مشغل

```
❌ خطأ في الاتصال بـ PostgreSQL:
   connect ECONNREFUSED 127.0.0.1:5432
💡 نصيحة: تأكد من تشغيل خادم PostgreSQL
```

**الحل:**

- **Windows**: افتح Services وابحث عن "postgresql" وشغله
- أو من Terminal:

  ```powershell
  # تحقق من الخدمة
  Get-Service -Name postgresql*

  # تشغيل الخدمة
  Start-Service -Name postgresql-x64-16
  ```

---

### مشكلة 4: MongoDB غير مشغل

```
❌ خطأ في الاتصال بـ MongoDB:
   connect ECONNREFUSED 127.0.0.1:27017
💡 نصيحة: تأكد من تشغيل خادم MongoDB
```

**الحل:**

```powershell
# شغل MongoDB
mongod

# أو إذا كان مثبت كخدمة:
net start MongoDB
```

---

### مشكلة 5: المكتبات غير مثبتة

```
Error: Cannot find module 'pg'
```

**الحل:**

```powershell
npm install
```

---

## 🎯 بعد نجاح الاختبار

إذا نجحت جميع الاختبارات، أنت الآن جاهز لـ:

### ✅ الخطوة 3: تثبيت VS Code Extensions

افتح VS Code واضغط `Ctrl+Shift+X` ثم ثبت:

**الأساسية:**

- ESLint
- Prettier - Code formatter
- GitLens
- Thunder Client (بديل Postman)

**لقواعد البيانات:**

- PostgreSQL (ckolkman.vscode-postgres)
- MongoDB for VS Code
- Docker (إذا كنت تستخدمه)

**للتطوير:**

- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Path Intellisense

---

### ✅ الخطوة 4: جهز Postman أو Thunder Client

**الخيار 1: Thunder Client (موصى به - داخل VS Code)**

- مثبت من Extensions
- سهل الاستخدام
- متكامل مع VS Code

**الخيار 2: Postman**

- حمل من: https://www.postman.com/downloads/
- أكثر ميزات
- منفصل عن VS Code

---

## 📝 ملاحظات مهمة

### 1. كلمات المرور

⚠️ **لا تشارك ملف `test-database-connection.js` مع كلمة المرور الحقيقية!**

في المشروع الفعلي، سنستخدم ملفات `.env` لحفظ البيانات الحساسة.

### 2. قاعدة البيانات MoDB

اسم قاعدة البيانات `MoDB` مقبول، لكن في المشروع الفعلي سنستخدم `eduhub`.

يمكنك:

- الاستمرار مع `MoDB`
- أو إنشاء قاعدة بيانات جديدة باسم `eduhub`:
  ```sql
  CREATE DATABASE eduhub;
  ```

### 3. Redis اختياري

Redis ليس ضرورياً للبدء. يمكنك إضافته لاحقاً عند الحاجة.

---

## 🚀 الخطوات التالية

بعد نجاح الاختبار:

1. ✅ **راجع `QUICK_START.md`** - للبدء في إنشاء المشروع
2. ✅ **ابدأ في إنشاء هيكل المشروع** - Frontend + Backend
3. ✅ **أنشئ أول API endpoint** - للتأكد من أن كل شيء يعمل

---

## 📞 المساعدة

إذا واجهت أي مشاكل:

1. راجع قسم "حل المشاكل الشائعة" أعلاه
2. تحقق من أن جميع الخدمات تعمل
3. اسألني وسأساعدك!

---

**حظاً موفقاً! 🎉**
