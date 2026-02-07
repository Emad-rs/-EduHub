# 📡 API Documentation - EduHub

## 🎯 نظرة عامة

**Base URL**: `https://api.eduhub.com/api/v1`  
**Protocol**: REST API  
**Format**: JSON  
**Authentication**: JWT Bearer Token

---

## 🔐 المصادقة (Authentication)

### Headers

```http
Authorization: Bearer {access_token}
Content-Type: application/json
```

### Token Structure

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 900
}
```

---

## 📋 Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2026-01-26T17:00:00Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": { ... }
  },
  "timestamp": "2026-01-26T17:00:00Z"
}
```

### Pagination Response

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 🔑 Error Codes

| Code       | Message                 | HTTP Status |
| ---------- | ----------------------- | ----------- |
| `AUTH_001` | Invalid credentials     | 401         |
| `AUTH_002` | Token expired           | 401         |
| `AUTH_003` | Invalid token           | 401         |
| `AUTH_004` | Unauthorized access     | 403         |
| `VAL_001`  | Validation error        | 400         |
| `VAL_002`  | Missing required field  | 400         |
| `RES_001`  | Resource not found      | 404         |
| `RES_002`  | Resource already exists | 409         |
| `SRV_001`  | Internal server error   | 500         |
| `SRV_002`  | Database error          | 500         |
| `RATE_001` | Rate limit exceeded     | 429         |

---

## 📚 API Endpoints

### 1. Authentication APIs

#### 1.1 Register

```http
POST /auth/register
```

**Request Body:**

```json
{
  "email": "student@example.com",
  "password": "SecurePass123!",
  "firstName": "أحمد",
  "lastName": "محمد",
  "role": "student",
  "studentId": "2021001",
  "department": "Computer Science",
  "major": "Software Engineering",
  "yearOfStudy": 3
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@example.com",
      "firstName": "أحمد",
      "lastName": "محمد",
      "role": "student"
    },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  },
  "message": "Registration successful"
}
```

---

#### 1.2 Login

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "student@example.com",
  "password": "SecurePass123!",
  "rememberMe": true
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@example.com",
      "firstName": "أحمد",
      "lastName": "محمد",
      "role": "student",
      "avatar": "https://..."
    },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

---

#### 1.3 Refresh Token

```http
POST /auth/refresh
```

**Request Body:**

```json
{
  "refreshToken": "..."
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

#### 1.4 Logout

```http
POST /auth/logout
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### 1.5 Forgot Password

```http
POST /auth/forgot-password
```

**Request Body:**

```json
{
  "email": "student@example.com"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

#### 1.6 Reset Password

```http
POST /auth/reset-password
```

**Request Body:**

```json
{
  "token": "reset_token",
  "newPassword": "NewSecurePass123!"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### 2. User APIs

#### 2.1 Get Current User

```http
GET /users/me
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "student@example.com",
    "firstName": "أحمد",
    "lastName": "محمد",
    "role": "student",
    "avatar": "https://...",
    "bio": "طالب في كلية تقنية المعلومات",
    "studentId": "2021001",
    "department": "Computer Science",
    "major": "Software Engineering",
    "yearOfStudy": 3,
    "createdAt": "2026-01-01T00:00:00Z"
  }
}
```

---

#### 2.2 Update Profile

```http
PUT /users/me
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "firstName": "أحمد",
  "lastName": "محمد",
  "bio": "طالب متحمس للبرمجة",
  "phone": "+966501234567"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "أحمد",
    "lastName": "محمد",
    "bio": "طالب متحمس للبرمجة",
    "phone": "+966501234567"
  },
  "message": "Profile updated successfully"
}
```

---

#### 2.3 Upload Avatar

```http
PUT /users/me/avatar
```

**Headers:**

- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data`

**Request Body:** (Form Data)

```
avatar: [File]
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "avatarUrl": "https://cdn.eduhub.com/avatars/uuid.jpg"
  },
  "message": "Avatar uploaded successfully"
}
```

---

#### 2.4 Get User by ID

```http
GET /users/:id
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "أحمد",
    "lastName": "محمد",
    "avatar": "https://...",
    "bio": "...",
    "role": "student",
    "department": "Computer Science"
  }
}
```

---

### 3. Books APIs

#### 3.1 Get All Books

```http
GET /books?page=1&limit=20&category=programming&sort=rating
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `category` (optional): Filter by category
- `subject` (optional): Filter by subject
- `language` (optional): Filter by language (ar/en)
- `sort` (optional): Sort by (title, author, rating, date)
- `order` (optional): Order (asc/desc)

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "مقدمة في البرمجة",
      "author": "محمد أحمد",
      "isbn": "978-1234567890",
      "category": "programming",
      "subject": "Computer Science",
      "coverImage": "https://...",
      "averageRating": 4.5,
      "ratingsCount": 120,
      "pages": 350,
      "language": "ar",
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

#### 3.2 Get Book by ID

```http
GET /books/:id
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "مقدمة في البرمجة",
    "author": "محمد أحمد",
    "isbn": "978-1234567890",
    "publisher": "دار النشر",
    "publicationYear": 2025,
    "category": "programming",
    "subject": "Computer Science",
    "description": "كتاب شامل عن البرمجة...",
    "coverImage": "https://...",
    "fileUrl": "https://...",
    "fileSize": 5242880,
    "pages": 350,
    "language": "ar",
    "averageRating": 4.5,
    "ratingsCount": 120,
    "downloadsCount": 500,
    "viewsCount": 1200,
    "isFavorited": false,
    "userRating": null,
    "readingProgress": null,
    "createdAt": "2026-01-01T00:00:00Z"
  }
}
```

---

#### 3.3 Search Books

```http
GET /books/search?q=برمجة&category=programming
```

**Query Parameters:**

- `q` (required): Search query
- `category` (optional): Filter by category
- `subject` (optional): Filter by subject
- `author` (optional): Filter by author
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "مقدمة في البرمجة",
      "author": "محمد أحمد",
      "coverImage": "https://...",
      "averageRating": 4.5,
      "highlight": {
        "title": "مقدمة في <mark>البرمجة</mark>",
        "description": "كتاب شامل عن <mark>البرمجة</mark>..."
      }
    }
  ],
  "pagination": { ... }
}
```

---

#### 3.4 Create Book (Admin/Professor)

```http
POST /books
```

**Headers:**

- `Authorization: Bearer {token}`
- `Content-Type: multipart/form-data`

**Request Body:** (Form Data)

```
title: مقدمة في البرمجة
author: محمد أحمد
isbn: 978-1234567890
publisher: دار النشر
publicationYear: 2025
category: programming
subject: Computer Science
description: كتاب شامل...
language: ar
pages: 350
coverImage: [File]
file: [File]
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "مقدمة في البرمجة",
    ...
  },
  "message": "Book created successfully"
}
```

---

#### 3.5 Rate Book

```http
POST /books/:id/rate
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "rating": 5,
  "review": "كتاب ممتاز ومفيد جداً!"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "rating": 5,
    "review": "كتاب ممتاز ومفيد جداً!",
    "createdAt": "2026-01-26T17:00:00Z"
  },
  "message": "Rating submitted successfully"
}
```

---

#### 3.6 Get Book Reviews

```http
GET /books/:id/reviews?page=1&limit=10
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "firstName": "أحمد",
        "lastName": "محمد",
        "avatar": "https://..."
      },
      "rating": 5,
      "review": "كتاب ممتاز ومفيد جداً!",
      "createdAt": "2026-01-26T17:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

#### 3.7 Add to Favorites

```http
POST /books/:id/favorite
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Book added to favorites"
}
```

---

#### 3.8 Remove from Favorites

```http
DELETE /books/:id/favorite
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Book removed from favorites"
}
```

---

#### 3.9 Get Favorites

```http
GET /books/favorites?page=1&limit=20
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "مقدمة في البرمجة",
      "author": "محمد أحمد",
      "coverImage": "https://...",
      "averageRating": 4.5,
      "addedAt": "2026-01-20T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

#### 3.10 Update Reading Progress

```http
POST /books/:id/progress
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "currentPage": 150,
  "totalPages": 350
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "currentPage": 150,
    "totalPages": 350,
    "progressPercentage": 42.86,
    "lastReadAt": "2026-01-26T17:00:00Z"
  }
}
```

---

### 4. Posts APIs

#### 4.1 Get All Posts

```http
GET /posts?page=1&limit=20&type=question&groupId=uuid
```

**Query Parameters:**

- `page` (optional): Page number
- `limit` (optional): Items per page
- `type` (optional): Filter by type (question, announcement, discussion, resource)
- `groupId` (optional): Filter by group
- `sort` (optional): Sort by (date, likes, comments)

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "mongodb_id",
      "author": {
        "id": "uuid",
        "firstName": "أحمد",
        "lastName": "محمد",
        "avatar": "https://..."
      },
      "group": {
        "id": "uuid",
        "name": "مادة البرمجة"
      },
      "type": "question",
      "title": "كيف أتعلم React؟",
      "content": "أريد تعلم React، من أين أبدأ؟",
      "attachments": [],
      "tags": ["react", "javascript"],
      "likesCount": 15,
      "commentsCount": 8,
      "sharesCount": 2,
      "viewsCount": 120,
      "isPinned": false,
      "isLiked": false,
      "createdAt": "2026-01-26T15:00:00Z",
      "updatedAt": "2026-01-26T15:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

#### 4.2 Get Post by ID

```http
GET /posts/:id
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "mongodb_id",
    "author": { ... },
    "group": { ... },
    "type": "question",
    "title": "كيف أتعلم React؟",
    "content": "أريد تعلم React، من أين أبدأ؟",
    "attachments": [],
    "tags": ["react", "javascript"],
    "likesCount": 15,
    "commentsCount": 8,
    "sharesCount": 2,
    "viewsCount": 121,
    "isPinned": false,
    "isLiked": false,
    "createdAt": "2026-01-26T15:00:00Z"
  }
}
```

---

#### 4.3 Create Post

```http
POST /posts
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "groupId": "uuid",
  "type": "question",
  "title": "كيف أتعلم React؟",
  "content": "أريد تعلم React، من أين أبدأ؟",
  "tags": ["react", "javascript"],
  "attachments": [
    {
      "type": "image",
      "url": "https://...",
      "name": "screenshot.png"
    }
  ]
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "id": "mongodb_id",
    "author": { ... },
    "type": "question",
    "title": "كيف أتعلم React؟",
    "content": "أريد تعلم React، من أين أبدأ؟",
    "createdAt": "2026-01-26T17:00:00Z"
  },
  "message": "Post created successfully"
}
```

---

#### 4.4 Update Post

```http
PUT /posts/:id
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "title": "كيف أتعلم React بشكل صحيح؟",
  "content": "أريد تعلم React من الصفر، ما هي أفضل المصادر؟"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": { ... },
  "message": "Post updated successfully"
}
```

---

#### 4.5 Delete Post

```http
DELETE /posts/:id
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

---

#### 4.6 Like Post

```http
POST /posts/:id/like
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "likesCount": 16,
    "isLiked": true
  }
}
```

---

#### 4.7 Unlike Post

```http
DELETE /posts/:id/like
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "likesCount": 15,
    "isLiked": false
  }
}
```

---

#### 4.8 Get Comments

```http
GET /posts/:id/comments?page=1&limit=10
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "mongodb_id",
      "author": {
        "id": "uuid",
        "firstName": "سارة",
        "lastName": "علي",
        "avatar": "https://..."
      },
      "content": "أنصحك بالبدء بالتوثيق الرسمي",
      "likesCount": 5,
      "repliesCount": 2,
      "isLiked": false,
      "createdAt": "2026-01-26T15:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

#### 4.9 Add Comment

```http
POST /posts/:id/comment
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "content": "أنصحك بالبدء بالتوثيق الرسمي",
  "parentCommentId": null
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "id": "mongodb_id",
    "content": "أنصحك بالبدء بالتوثيق الرسمي",
    "createdAt": "2026-01-26T17:00:00Z"
  },
  "message": "Comment added successfully"
}
```

---

### 5. AI Assistant APIs

#### 5.1 Send Message

```http
POST /ai/chat
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "conversationId": "mongodb_id",
  "message": "ما هي أفضل طريقة لتعلم البرمجة؟",
  "context": {
    "subject": "programming",
    "courseId": "uuid"
  }
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "conversationId": "mongodb_id",
    "message": {
      "role": "assistant",
      "content": "أفضل طريقة لتعلم البرمجة هي...",
      "timestamp": "2026-01-26T17:00:00Z"
    },
    "tokensUsed": 150
  }
}
```

---

#### 5.2 Get Conversations

```http
GET /ai/conversations?page=1&limit=20
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "mongodb_id",
      "title": "تعلم البرمجة",
      "lastMessage": {
        "content": "أفضل طريقة لتعلم البرمجة هي...",
        "timestamp": "2026-01-26T17:00:00Z"
      },
      "messagesCount": 15,
      "createdAt": "2026-01-25T10:00:00Z",
      "updatedAt": "2026-01-26T17:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

#### 5.3 Get Conversation by ID

```http
GET /ai/conversations/:id
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "mongodb_id",
    "title": "تعلم البرمجة",
    "messages": [
      {
        "role": "user",
        "content": "ما هي أفضل طريقة لتعلم البرمجة؟",
        "timestamp": "2026-01-26T16:55:00Z"
      },
      {
        "role": "assistant",
        "content": "أفضل طريقة لتعلم البرمجة هي...",
        "timestamp": "2026-01-26T17:00:00Z"
      }
    ],
    "context": {
      "subject": "programming"
    },
    "tokensUsed": 500,
    "createdAt": "2026-01-25T10:00:00Z"
  }
}
```

---

#### 5.4 Delete Conversation

```http
DELETE /ai/conversations/:id
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Conversation deleted successfully"
}
```

---

#### 5.5 Get Recommendations

```http
POST /ai/recommendations
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "type": "books",
  "context": {
    "interests": ["programming", "web development"],
    "level": "beginner"
  }
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "id": "uuid",
        "title": "مقدمة في البرمجة",
        "reason": "مناسب للمبتدئين في البرمجة",
        "score": 0.95
      }
    ]
  }
}
```

---

### 6. Activities APIs

#### 6.1 Get All Activities

```http
GET /activities?page=1&limit=20&type=workshop&status=upcoming
```

**Query Parameters:**

- `page`, `limit`: Pagination
- `type`: Filter by type (workshop, seminar, competition, trip, social)
- `status`: Filter by status (upcoming, ongoing, completed, cancelled)
- `sort`: Sort by (date, participants, points)

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "ورشة عمل: تطوير تطبيقات الويب",
      "description": "ورشة عمل شاملة عن تطوير تطبيقات الويب...",
      "type": "workshop",
      "location": "قاعة 101",
      "startDate": "2026-02-01T14:00:00Z",
      "endDate": "2026-02-01T17:00:00Z",
      "registrationDeadline": "2026-01-30T23:59:59Z",
      "maxParticipants": 50,
      "currentParticipants": 35,
      "points": 10,
      "coverImage": "https://...",
      "organizer": {
        "id": "uuid",
        "firstName": "د. محمد",
        "lastName": "أحمد"
      },
      "status": "upcoming",
      "isRegistrationOpen": true,
      "isRegistered": false,
      "createdAt": "2026-01-15T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

#### 6.2 Get Activity by ID

```http
GET /activities/:id
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "ورشة عمل: تطوير تطبيقات الويب",
    "description": "ورشة عمل شاملة...",
    "type": "workshop",
    "location": "قاعة 101",
    "startDate": "2026-02-01T14:00:00Z",
    "endDate": "2026-02-01T17:00:00Z",
    "registrationDeadline": "2026-01-30T23:59:59Z",
    "maxParticipants": 50,
    "currentParticipants": 35,
    "availableSeats": 15,
    "points": 10,
    "coverImage": "https://...",
    "organizer": { ... },
    "status": "upcoming",
    "isRegistrationOpen": true,
    "isRegistered": false,
    "participants": [
      {
        "id": "uuid",
        "firstName": "أحمد",
        "avatar": "https://..."
      }
    ],
    "createdAt": "2026-01-15T10:00:00Z"
  }
}
```

---

#### 6.3 Create Activity (Admin)

```http
POST /activities
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "title": "ورشة عمل: تطوير تطبيقات الويب",
  "description": "ورشة عمل شاملة...",
  "type": "workshop",
  "location": "قاعة 101",
  "startDate": "2026-02-01T14:00:00Z",
  "endDate": "2026-02-01T17:00:00Z",
  "registrationDeadline": "2026-01-30T23:59:59Z",
  "maxParticipants": 50,
  "points": 10,
  "coverImage": "https://..."
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": { ... },
  "message": "Activity created successfully"
}
```

---

#### 6.4 Register for Activity

```http
POST /activities/:id/register
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "activityId": "uuid",
    "status": "registered",
    "registeredAt": "2026-01-26T17:00:00Z"
  },
  "message": "Registered successfully"
}
```

---

#### 6.5 Unregister from Activity

```http
POST /activities/:id/unregister
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Unregistered successfully"
}
```

---

#### 6.6 Rate Activity

```http
POST /activities/:id/rate
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "rating": 5,
  "feedback": "ورشة عمل ممتازة ومفيدة جداً!"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Rating submitted successfully"
}
```

---

### 7. Attendance APIs

#### 7.1 Create Session (Professor)

```http
POST /attendance/sessions
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "courseId": "uuid",
  "title": "المحاضرة الأولى",
  "sessionDate": "2026-01-27",
  "startTime": "10:00:00",
  "endTime": "11:30:00",
  "location": "قاعة 201",
  "duration": 15
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "courseId": "uuid",
    "title": "المحاضرة الأولى",
    "qrCode": "unique_qr_code_string",
    "qrExpiresAt": "2026-01-27T10:15:00Z",
    "isActive": true,
    "createdAt": "2026-01-26T17:00:00Z"
  },
  "message": "Session created successfully"
}
```

---

#### 7.2 Get Session by ID

```http
GET /attendance/sessions/:id
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "course": {
      "id": "uuid",
      "name": "البرمجة الكائنية",
      "code": "CS201"
    },
    "professor": {
      "id": "uuid",
      "firstName": "د. محمد",
      "lastName": "أحمد"
    },
    "title": "المحاضرة الأولى",
    "sessionDate": "2026-01-27",
    "startTime": "10:00:00",
    "endTime": "11:30:00",
    "location": "قاعة 201",
    "qrCode": "unique_qr_code_string",
    "qrExpiresAt": "2026-01-27T10:15:00Z",
    "isActive": true,
    "attendanceCount": 45,
    "createdAt": "2026-01-26T17:00:00Z"
  }
}
```

---

#### 7.3 Check-in (Student)

```http
POST /attendance/check-in
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "qrCode": "unique_qr_code_string"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "sessionId": "uuid",
    "studentId": "uuid",
    "checkedInAt": "2026-01-27T10:05:00Z",
    "status": "present"
  },
  "message": "Attendance recorded successfully"
}
```

---

#### 7.4 Get My Attendance Records

```http
GET /attendance/my-records?courseId=uuid&page=1&limit=20
```

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**

- `courseId` (optional): Filter by course
- `page`, `limit`: Pagination

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "session": {
        "id": "uuid",
        "title": "المحاضرة الأولى",
        "sessionDate": "2026-01-27",
        "course": {
          "name": "البرمجة الكائنية"
        }
      },
      "checkedInAt": "2026-01-27T10:05:00Z",
      "status": "present"
    }
  ],
  "pagination": { ... }
}
```

---

#### 7.5 Get Attendance Reports (Professor)

```http
GET /attendance/reports?courseId=uuid&sessionId=uuid
```

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**

- `courseId` (optional): Filter by course
- `sessionId` (optional): Specific session

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "course": {
      "id": "uuid",
      "name": "البرمجة الكائنية"
    },
    "totalSessions": 10,
    "totalStudents": 50,
    "averageAttendance": 85.5,
    "sessions": [
      {
        "id": "uuid",
        "title": "المحاضرة الأولى",
        "sessionDate": "2026-01-27",
        "attendanceCount": 45,
        "attendancePercentage": 90
      }
    ],
    "students": [
      {
        "id": "uuid",
        "firstName": "أحمد",
        "lastName": "محمد",
        "attendedSessions": 9,
        "attendancePercentage": 90
      }
    ]
  }
}
```

---

#### 7.6 Get Attendance Stats

```http
GET /attendance/stats
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "totalSessions": 50,
    "attendedSessions": 45,
    "attendancePercentage": 90,
    "byCourse": [
      {
        "courseId": "uuid",
        "courseName": "البرمجة الكائنية",
        "totalSessions": 10,
        "attendedSessions": 9,
        "percentage": 90
      }
    ]
  }
}
```

---

### 8. Dashboard APIs

#### 8.1 Student Dashboard

```http
GET /dashboard/student
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "attendancePercentage": 90,
    "booksRead": 12,
    "activitiesParticipated": 8,
    "pointsEarned": 450,
    "level": 5,
    "rank": 15,
    "recentActivity": [
      {
        "type": "book_completed",
        "title": "أكملت قراءة: مقدمة في البرمجة",
        "timestamp": "2026-01-26T15:00:00Z"
      }
    ],
    "upcomingActivities": [
      {
        "id": "uuid",
        "title": "ورشة عمل: تطوير تطبيقات الويب",
        "startDate": "2026-02-01T14:00:00Z"
      }
    ],
    "recommendations": [
      {
        "type": "book",
        "id": "uuid",
        "title": "تطوير تطبيقات الويب المتقدمة"
      }
    ]
  }
}
```

---

#### 8.2 Professor Dashboard

```http
GET /dashboard/professor
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "totalCourses": 3,
    "totalStudents": 150,
    "averageAttendance": 85.5,
    "recentQuestions": [
      {
        "id": "mongodb_id",
        "title": "كيف أتعلم React؟",
        "author": "أحمد محمد",
        "createdAt": "2026-01-26T15:00:00Z"
      }
    ],
    "upcomingSessions": [
      {
        "id": "uuid",
        "title": "المحاضرة الثانية",
        "sessionDate": "2026-01-28T10:00:00Z",
        "course": "البرمجة الكائنية"
      }
    ]
  }
}
```

---

#### 8.3 Admin Dashboard

```http
GET /dashboard/admin
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "totalUsers": 1000,
    "activeUsers": 750,
    "totalBooks": 500,
    "totalActivities": 100,
    "totalPosts": 10000,
    "platformStats": {
      "dailyActiveUsers": 500,
      "weeklyActiveUsers": 800,
      "monthlyActiveUsers": 950
    },
    "recentUsers": [
      {
        "id": "uuid",
        "firstName": "أحمد",
        "lastName": "محمد",
        "role": "student",
        "createdAt": "2026-01-26T10:00:00Z"
      }
    ]
  }
}
```

---

### 9. Notifications APIs

#### 9.1 Get Notifications

```http
GET /notifications?page=1&limit=20&isRead=false
```

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**

- `page`, `limit`: Pagination
- `isRead` (optional): Filter by read status
- `type` (optional): Filter by type

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "mongodb_id",
      "type": "post_comment",
      "title": "تعليق جديد",
      "message": "علق أحمد محمد على منشورك",
      "data": {
        "postId": "mongodb_id",
        "commentId": "mongodb_id"
      },
      "isRead": false,
      "createdAt": "2026-01-26T16:00:00Z"
    }
  ],
  "pagination": { ... },
  "unreadCount": 5
}
```

---

#### 9.2 Mark as Read

```http
PUT /notifications/:id/read
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

#### 9.3 Mark All as Read

```http
PUT /notifications/read-all
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

#### 9.4 Get Notification Settings

```http
GET /notifications/settings
```

**Headers:** `Authorization: Bearer {token}`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "emailNotifications": true,
    "pushNotifications": true,
    "types": {
      "posts": true,
      "comments": true,
      "messages": true,
      "activities": true,
      "attendance": false
    }
  }
}
```

---

#### 9.5 Update Notification Settings

```http
PUT /notifications/settings
```

**Headers:** `Authorization: Bearer {token}`

**Request Body:**

```json
{
  "emailNotifications": true,
  "pushNotifications": false,
  "types": {
    "posts": true,
    "comments": true,
    "messages": true,
    "activities": false,
    "attendance": false
  }
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Settings updated successfully"
}
```

---

## 🔌 WebSocket Events

### Connection

```javascript
const socket = io("wss://api.eduhub.com", {
  auth: {
    token: "Bearer {access_token}",
  },
});
```

### Events

#### 1. User Online Status

```javascript
// Emit
socket.emit("user:online");

// Listen
socket.on("user:status", (data) => {
  // { userId: 'uuid', status: 'online' }
});
```

#### 2. New Message

```javascript
// Listen
socket.on("message:new", (data) => {
  // { conversationId: '...', message: {...} }
});
```

#### 3. Typing Indicator

```javascript
// Emit
socket.emit("message:typing", { conversationId: "..." });

// Listen
socket.on("message:typing", (data) => {
  // { conversationId: '...', userId: '...' }
});
```

#### 4. New Notification

```javascript
// Listen
socket.on("notification:new", (data) => {
  // { notification: {...} }
});
```

---

## 📊 Rate Limiting

- **Default**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP
- **AI Chat**: 20 requests per hour per user
- **File Upload**: 10 requests per hour per user

**Response when rate limit exceeded:**

```json
{
  "success": false,
  "error": {
    "code": "RATE_001",
    "message": "Too many requests. Please try again later.",
    "retryAfter": 900
  }
}
```

---

**تاريخ الإنشاء**: 26 يناير 2026  
**آخر تحديث**: 26 يناير 2026  
**الإصدار**: 1.0.0
