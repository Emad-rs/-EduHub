# 🗄️ تصميم قاعدة البيانات - EduHub

## 📋 جدول المحتويات

1. [نظرة عامة](#نظرة-عامة)
2. [PostgreSQL Schema](#postgresql-schema)
3. [MongoDB Collections](#mongodb-collections)
4. [Redis Keys](#redis-keys)
5. [العلاقات بين الجداول](#العلاقات-بين-الجداول)
6. [الفهارس (Indexes)](#الفهارس)

---

## 🎯 نظرة عامة

### استراتيجية قاعدة البيانات

نستخدم **Polyglot Persistence** - أكثر من قاعدة بيانات:

- **PostgreSQL**: للبيانات المنظمة والعلاقات المعقدة
- **MongoDB**: للبيانات المرنة والمتغيرة
- **Redis**: للتخزين المؤقت والبيانات الفورية
- **Elasticsearch**: للبحث المتقدم

### توزيع البيانات

```
PostgreSQL:
├── Users (المستخدمون)
├── Courses (المواد الدراسية)
├── Books (الكتب)
├── Activities (الأنشطة)
├── Attendance (الحضور)
└── Enrollments (التسجيلات)

MongoDB:
├── Posts (المنشورات)
├── Comments (التعليقات)
├── Messages (الرسائل)
├── Notifications (الإشعارات)
└── AI_Conversations (محادثات AI)

Redis:
├── Sessions (الجلسات)
├── Cache (التخزين المؤقت)
├── Rate_Limits (حدود الطلبات)
└── Real_Time_Data (البيانات الفورية)
```

---

## 🐘 PostgreSQL Schema

### 1. Users Table (جدول المستخدمين)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'professor', 'admin')),
    avatar_url TEXT,
    bio TEXT,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    student_id VARCHAR(50) UNIQUE, -- للطلاب فقط
    employee_id VARCHAR(50) UNIQUE, -- للأساتذة والإداريين
    department VARCHAR(100),
    major VARCHAR(100), -- للطلاب
    year_of_study INTEGER, -- للطلاب
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_student_id ON users(student_id);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### 2. Courses Table (جدول المواد الدراسية)

```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    department VARCHAR(100),
    credits INTEGER,
    semester VARCHAR(20),
    year INTEGER,
    professor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_courses_code ON courses(code);
CREATE INDEX idx_courses_professor_id ON courses(professor_id);
CREATE INDEX idx_courses_semester ON courses(semester, year);
```

### 3. Enrollments Table (جدول التسجيلات)

```sql
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    grade DECIMAL(5,2),
    UNIQUE(student_id, course_id)
);

-- Indexes
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
```

### 4. Books Table (جدول الكتب)

```sql
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(300) NOT NULL,
    author VARCHAR(200),
    isbn VARCHAR(20) UNIQUE,
    publisher VARCHAR(200),
    publication_year INTEGER,
    language VARCHAR(20) DEFAULT 'ar',
    pages INTEGER,
    category VARCHAR(100),
    subject VARCHAR(100),
    description TEXT,
    cover_image_url TEXT,
    file_url TEXT NOT NULL,
    file_size BIGINT, -- بالبايت
    uploaded_by UUID REFERENCES users(id),
    downloads_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    ratings_count INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_isbn ON books(isbn);
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_subject ON books(subject);
CREATE INDEX idx_books_average_rating ON books(average_rating);
CREATE INDEX idx_books_created_at ON books(created_at);
```

### 5. Book_Ratings Table (جدول تقييمات الكتب)

```sql
CREATE TABLE book_ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(book_id, user_id)
);

-- Indexes
CREATE INDEX idx_book_ratings_book_id ON book_ratings(book_id);
CREATE INDEX idx_book_ratings_user_id ON book_ratings(user_id);
```

### 6. Book_Favorites Table (جدول الكتب المفضلة)

```sql
CREATE TABLE book_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(book_id, user_id)
);

-- Indexes
CREATE INDEX idx_book_favorites_user_id ON book_favorites(user_id);
CREATE INDEX idx_book_favorites_book_id ON book_favorites(book_id);
```

### 7. Reading_Progress Table (جدول تقدم القراءة)

```sql
CREATE TABLE reading_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    current_page INTEGER DEFAULT 0,
    total_pages INTEGER,
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(book_id, user_id)
);

-- Indexes
CREATE INDEX idx_reading_progress_user_id ON reading_progress(user_id);
CREATE INDEX idx_reading_progress_book_id ON reading_progress(book_id);
```

### 8. Activities Table (جدول الأنشطة)

```sql
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('workshop', 'seminar', 'competition', 'trip', 'social')),
    location VARCHAR(200),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    registration_deadline TIMESTAMP,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0, -- النقاط التي يحصل عليها المشارك
    cover_image_url TEXT,
    organizer_id UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    is_registration_open BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_status ON activities(status);
CREATE INDEX idx_activities_start_date ON activities(start_date);
CREATE INDEX idx_activities_organizer_id ON activities(organizer_id);
```

### 9. Activity_Registrations Table (جدول تسجيلات الأنشطة)

```sql
CREATE TABLE activity_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled', 'waitlist')),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attended_at TIMESTAMP,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    UNIQUE(activity_id, user_id)
);

-- Indexes
CREATE INDEX idx_activity_registrations_activity_id ON activity_registrations(activity_id);
CREATE INDEX idx_activity_registrations_user_id ON activity_registrations(user_id);
CREATE INDEX idx_activity_registrations_status ON activity_registrations(status);
```

### 10. Attendance_Sessions Table (جدول جلسات الحضور)

```sql
CREATE TABLE attendance_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    professor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200),
    session_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    qr_code TEXT UNIQUE NOT NULL, -- QR Code فريد
    qr_expires_at TIMESTAMP NOT NULL, -- انتهاء صلاحية QR
    location VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_attendance_sessions_course_id ON attendance_sessions(course_id);
CREATE INDEX idx_attendance_sessions_professor_id ON attendance_sessions(professor_id);
CREATE INDEX idx_attendance_sessions_session_date ON attendance_sessions(session_date);
CREATE INDEX idx_attendance_sessions_qr_code ON attendance_sessions(qr_code);
```

### 11. Attendance_Records Table (جدول سجلات الحضور)

```sql
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES attendance_sessions(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    checked_in_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'present' CHECK (status IN ('present', 'late', 'absent')),
    ip_address VARCHAR(45),
    user_agent TEXT,
    UNIQUE(session_id, student_id)
);

-- Indexes
CREATE INDEX idx_attendance_records_session_id ON attendance_records(session_id);
CREATE INDEX idx_attendance_records_student_id ON attendance_records(student_id);
CREATE INDEX idx_attendance_records_status ON attendance_records(status);
```

### 12. User_Points Table (جدول نقاط المستخدمين)

```sql
CREATE TABLE user_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    total_points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    rank INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_user_points_user_id ON user_points(user_id);
CREATE INDEX idx_user_points_total_points ON user_points(total_points DESC);
```

### 13. Badges Table (جدول الشارات)

```sql
CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url TEXT,
    criteria JSONB, -- معايير الحصول على الشارة
    points_required INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 14. User_Badges Table (جدول شارات المستخدمين)

```sql
CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- Indexes
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);
```

### 15. Groups Table (جدول المجموعات)

```sql
CREATE TABLE groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    type VARCHAR(20) DEFAULT 'course' CHECK (type IN ('course', 'club', 'general')),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    avatar_url TEXT,
    is_private BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES users(id),
    members_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_groups_type ON groups(type);
CREATE INDEX idx_groups_course_id ON groups(course_id);
CREATE INDEX idx_groups_created_by ON groups(created_by);
```

### 16. Group_Members Table (جدول أعضاء المجموعات)

```sql
CREATE TABLE group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(group_id, user_id)
);

-- Indexes
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_group_members_user_id ON group_members(user_id);
```

---

## 🍃 MongoDB Collections

### 1. Posts Collection (مجموعة المنشورات)

```javascript
{
  _id: ObjectId,
  author_id: String, // UUID من PostgreSQL
  group_id: String, // UUID من PostgreSQL (اختياري)
  type: String, // 'question', 'announcement', 'discussion', 'resource'
  title: String,
  content: String,
  attachments: [
    {
      type: String, // 'image', 'file', 'link'
      url: String,
      name: String,
      size: Number
    }
  ],
  tags: [String],
  likes_count: Number,
  comments_count: Number,
  shares_count: Number,
  views_count: Number,
  is_pinned: Boolean,
  is_edited: Boolean,
  created_at: Date,
  updated_at: Date
}

// Indexes
db.posts.createIndex({ author_id: 1 })
db.posts.createIndex({ group_id: 1 })
db.posts.createIndex({ type: 1 })
db.posts.createIndex({ created_at: -1 })
db.posts.createIndex({ tags: 1 })
```

### 2. Comments Collection (مجموعة التعليقات)

```javascript
{
  _id: ObjectId,
  post_id: ObjectId,
  author_id: String, // UUID من PostgreSQL
  parent_comment_id: ObjectId, // للردود على التعليقات
  content: String,
  likes_count: Number,
  replies_count: Number,
  is_edited: Boolean,
  created_at: Date,
  updated_at: Date
}

// Indexes
db.comments.createIndex({ post_id: 1, created_at: 1 })
db.comments.createIndex({ author_id: 1 })
db.comments.createIndex({ parent_comment_id: 1 })
```

### 3. Post_Likes Collection (مجموعة إعجابات المنشورات)

```javascript
{
  _id: ObjectId,
  post_id: ObjectId,
  user_id: String, // UUID من PostgreSQL
  created_at: Date
}

// Indexes
db.post_likes.createIndex({ post_id: 1, user_id: 1 }, { unique: true })
db.post_likes.createIndex({ user_id: 1 })
```

### 4. Messages Collection (مجموعة الرسائل)

```javascript
{
  _id: ObjectId,
  conversation_id: String,
  sender_id: String, // UUID من PostgreSQL
  recipient_id: String, // UUID من PostgreSQL (للمحادثات الفردية)
  content: String,
  attachments: [
    {
      type: String,
      url: String,
      name: String
    }
  ],
  is_read: Boolean,
  read_at: Date,
  is_deleted: Boolean,
  created_at: Date
}

// Indexes
db.messages.createIndex({ conversation_id: 1, created_at: -1 })
db.messages.createIndex({ sender_id: 1 })
db.messages.createIndex({ recipient_id: 1 })
db.messages.createIndex({ is_read: 1 })
```

### 5. Conversations Collection (مجموعة المحادثات)

```javascript
{
  _id: String, // conversation_id
  type: String, // 'direct', 'group'
  participants: [String], // UUIDs من PostgreSQL
  last_message: {
    content: String,
    sender_id: String,
    sent_at: Date
  },
  unread_count: {
    user_id: Number // عدد الرسائل غير المقروءة لكل مستخدم
  },
  created_at: Date,
  updated_at: Date
}

// Indexes
db.conversations.createIndex({ participants: 1 })
db.conversations.createIndex({ updated_at: -1 })
```

### 6. Notifications Collection (مجموعة الإشعارات)

```javascript
{
  _id: ObjectId,
  user_id: String, // UUID من PostgreSQL
  type: String, // 'post', 'comment', 'message', 'activity', 'attendance', etc.
  title: String,
  message: String,
  data: {
    // بيانات إضافية حسب النوع
    entity_id: String,
    entity_type: String,
    action: String
  },
  is_read: Boolean,
  read_at: Date,
  created_at: Date
}

// Indexes
db.notifications.createIndex({ user_id: 1, created_at: -1 })
db.notifications.createIndex({ user_id: 1, is_read: 1 })
db.notifications.createIndex({ type: 1 })
```

### 7. AI_Conversations Collection (مجموعة محادثات AI)

```javascript
{
  _id: ObjectId,
  user_id: String, // UUID من PostgreSQL
  title: String, // عنوان المحادثة (أول سؤال)
  messages: [
    {
      role: String, // 'user' or 'assistant'
      content: String,
      timestamp: Date
    }
  ],
  context: {
    // سياق المحادثة
    subject: String,
    course_id: String
  },
  tokens_used: Number,
  created_at: Date,
  updated_at: Date
}

// Indexes
db.ai_conversations.createIndex({ user_id: 1, created_at: -1 })
db.ai_conversations.createIndex({ 'context.subject': 1 })
```

### 8. Activity_Logs Collection (مجموعة سجلات النشاط)

```javascript
{
  _id: ObjectId,
  user_id: String, // UUID من PostgreSQL
  action: String, // 'login', 'view_book', 'download_book', etc.
  entity_type: String, // 'book', 'post', 'activity', etc.
  entity_id: String,
  metadata: {
    // بيانات إضافية
    ip_address: String,
    user_agent: String,
    duration: Number // مدة النشاط (للقراءة مثلاً)
  },
  created_at: Date
}

// Indexes
db.activity_logs.createIndex({ user_id: 1, created_at: -1 })
db.activity_logs.createIndex({ action: 1 })
db.activity_logs.createIndex({ entity_type: 1, entity_id: 1 })
db.activity_logs.createIndex({ created_at: -1 })
```

---

## 🔴 Redis Keys

### 1. Session Management

```
Key Pattern: session:{session_id}
Type: String (JSON)
TTL: 7 days
Value: {
  user_id: String,
  role: String,
  created_at: Number,
  last_activity: Number
}
```

### 2. User Cache

```
Key Pattern: user:{user_id}
Type: String (JSON)
TTL: 1 hour
Value: User Object
```

### 3. Rate Limiting

```
Key Pattern: rate_limit:{ip}:{endpoint}
Type: String (Counter)
TTL: 15 minutes
Value: Request Count
```

### 4. QR Code Sessions

```
Key Pattern: qr:{qr_code}
Type: String (JSON)
TTL: Session duration
Value: {
  session_id: String,
  course_id: String,
  professor_id: String,
  expires_at: Number
}
```

### 5. Online Users

```
Key Pattern: online_users
Type: Set
Value: Set of user_ids
```

### 6. Cached Queries

```
Key Pattern: cache:{query_hash}
Type: String (JSON)
TTL: 5-60 minutes (حسب النوع)
Value: Query Result
```

### 7. Leaderboard

```
Key Pattern: leaderboard:points
Type: Sorted Set
Score: Total Points
Member: user_id
```

---

## 🔗 العلاقات بين الجداول

### Entity Relationship Diagram (ERD)

```
Users (1) ──────────── (N) Enrollments
  │                           │
  │                           │
  │                      (N) Courses (1)
  │                           │
  │                           │
  │                      (N) Attendance_Sessions
  │                           │
  │                           │
  │                      (N) Attendance_Records
  │
  ├────────── (N) Book_Ratings
  │                 │
  │                 │
  │            (1) Books
  │                 │
  │                 │
  ├────────── (N) Book_Favorites
  │
  ├────────── (N) Reading_Progress
  │
  ├────────── (N) Activity_Registrations
  │                 │
  │                 │
  │            (1) Activities
  │
  ├────────── (1) User_Points
  │
  ├────────── (N) User_Badges
  │                 │
  │                 │
  │            (1) Badges
  │
  └────────── (N) Group_Members
                    │
                    │
               (1) Groups
```

---

## 📊 الفهارس (Indexes)

### PostgreSQL Indexes

#### Primary Indexes (تم إنشاؤها تلقائياً)

- جميع الـ Primary Keys
- جميع الـ Unique Constraints

#### Secondary Indexes (للأداء)

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Books
CREATE INDEX idx_books_category_rating ON books(category, average_rating DESC);
CREATE INDEX idx_books_fulltext ON books USING GIN(to_tsvector('english', title || ' ' || author));

-- Attendance
CREATE INDEX idx_attendance_records_composite ON attendance_records(student_id, session_id, status);

-- Activities
CREATE INDEX idx_activities_date_status ON activities(start_date, status);
```

### MongoDB Indexes

```javascript
// Posts - Compound Index
db.posts.createIndex({ group_id: 1, created_at: -1 });

// Messages - Compound Index
db.messages.createIndex({ conversation_id: 1, created_at: -1 });

// Notifications - Compound Index
db.notifications.createIndex({ user_id: 1, is_read: 1, created_at: -1 });

// Text Search
db.posts.createIndex({ title: "text", content: "text", tags: "text" });
```

---

## 🔄 Data Migration Strategy

### المرحلة 1: الإعداد الأولي

1. إنشاء قواعد البيانات
2. تشغيل Migration Scripts
3. إنشاء الفهارس

### المرحلة 2: البيانات الأولية (Seeding)

1. إنشاء مستخدم Admin
2. إضافة Badges الأساسية
3. إنشاء مجموعات افتراضية
4. إضافة بيانات تجريبية (للتطوير)

### المرحلة 3: النسخ الاحتياطي

1. نسخ احتياطي يومي تلقائي
2. Point-in-Time Recovery
3. تخزين النسخ في S3

---

## 📈 تقديرات الحجم

### السنة الأولى (1000 مستخدم)

```
PostgreSQL:
- Users: ~1,000 rows (< 1 MB)
- Books: ~500 rows (< 1 MB)
- Attendance: ~50,000 rows (~5 MB)
- Activities: ~100 rows (< 1 MB)
Total: ~10-20 MB

MongoDB:
- Posts: ~10,000 documents (~50 MB)
- Comments: ~30,000 documents (~30 MB)
- Messages: ~100,000 documents (~100 MB)
- Notifications: ~500,000 documents (~200 MB)
Total: ~400-500 MB

Redis:
- Active Sessions: ~100 keys (< 1 MB)
- Cache: ~1,000 keys (~10 MB)
Total: ~10-20 MB
```

---

## 🔐 Data Security

### 1. Encryption

- Passwords: bcrypt hashing
- Sensitive Data: AES-256 encryption (اختياري)
- Connections: SSL/TLS

### 2. Access Control

- Database Users: Least Privilege Principle
- Application: Connection Pooling
- Backup: Encrypted Backups

### 3. Data Privacy

- GDPR Compliance (اختياري)
- Right to be Forgotten
- Data Anonymization

---

**تاريخ الإنشاء**: 26 يناير 2026  
**آخر تحديث**: 26 يناير 2026  
**الإصدار**: 1.0.0
