/**
 * اختبار الاتصال بقواعد البيانات - EduHub
 *
 * هذا الملف يختبر الاتصال بـ:
 * 1. PostgreSQL (MoDB)
 * 2. MongoDB
 * 3. Redis (إذا كان متوفراً)
 */

const { Client } = require("pg");
const { MongoClient } = require("mongodb");

// ألوان للطباعة
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// ==============================================
// 1. اختبار PostgreSQL
// ==============================================
async function testPostgreSQL() {
  log("\n📊 اختبار الاتصال بـ PostgreSQL...", "cyan");

  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "MoDB", // اسم قاعدة البيانات التي أنشأتها
    user: "postgres",
    password: "Emadsaad", // ✅ تم تحديث كلمة المرور
  });

  try {
    await client.connect();
    log("✅ الاتصال بـ PostgreSQL نجح!", "green");

    // اختبار استعلام بسيط
    const result = await client.query("SELECT version()");
    log(`📌 إصدار PostgreSQL: ${result.rows[0].version.split(",")[0]}`, "blue");

    // اختبار إنشاء جدول بسيط
    await client.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    log("✅ تم إنشاء جدول اختبار بنجاح", "green");

    // إدراج بيانات تجريبية
    await client.query(`
      INSERT INTO test_table (name) VALUES ('Test Entry')
    `);
    log("✅ تم إدراج بيانات تجريبية", "green");

    // قراءة البيانات
    const data = await client.query("SELECT * FROM test_table");
    log(`✅ تم قراءة ${data.rows.length} سجل من الجدول`, "green");

    // حذف الجدول التجريبي
    await client.query("DROP TABLE test_table");
    log("✅ تم حذف الجدول التجريبي", "green");

    await client.end();
    return true;
  } catch (error) {
    log(`❌ خطأ في الاتصال بـ PostgreSQL:`, "red");
    log(`   ${error.message}`, "red");

    if (error.code === "ECONNREFUSED") {
      log("\n💡 نصيحة: تأكد من تشغيل خادم PostgreSQL", "yellow");
    } else if (error.code === "28P01") {
      log("\n💡 نصيحة: كلمة المرور غير صحيحة", "yellow");
    } else if (error.code === "3D000") {
      log('\n💡 نصيحة: قاعدة البيانات "MoDB" غير موجودة', "yellow");
      log("   قم بإنشائها باستخدام: psql -U postgres", "yellow");
      log('   ثم: CREATE DATABASE "MoDB";', "yellow");
    }

    return false;
  }
}

// ==============================================
// 2. اختبار MongoDB
// ==============================================
async function testMongoDB() {
  log("\n📊 اختبار الاتصال بـ MongoDB...", "cyan");

  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    log("✅ الاتصال بـ MongoDB نجح!", "green");

    // اختبار قاعدة البيانات
    const db = client.db("eduhub_test");

    // إنشاء مجموعة تجريبية
    const collection = db.collection("test_collection");

    // إدراج بيانات
    await collection.insertOne({
      name: "Test Document",
      createdAt: new Date(),
    });
    log("✅ تم إدراج مستند تجريبي", "green");

    // قراءة البيانات
    const count = await collection.countDocuments();
    log(`✅ عدد المستندات: ${count}`, "green");

    // حذف المجموعة التجريبية
    await collection.drop();
    log("✅ تم حذف المجموعة التجريبية", "green");

    await client.close();
    return true;
  } catch (error) {
    log(`❌ خطأ في الاتصال بـ MongoDB:`, "red");
    log(`   ${error.message}`, "red");

    if (error.message.includes("ECONNREFUSED")) {
      log("\n💡 نصيحة: تأكد من تشغيل خادم MongoDB", "yellow");
      log("   شغل الأمر: mongod", "yellow");
    }

    return false;
  }
}

// ==============================================
// 3. اختبار Redis (اختياري)
// ==============================================
async function testRedis() {
  log("\n📊 اختبار الاتصال بـ Redis...", "cyan");

  try {
    const redis = require("redis");
    const client = redis.createClient({
      socket: {
        host: "localhost",
        port: 6379,
      },
    });

    await client.connect();
    log("✅ الاتصال بـ Redis نجح!", "green");

    // اختبار كتابة وقراءة
    await client.set("test_key", "test_value");
    const value = await client.get("test_key");
    log(`✅ تم اختبار الكتابة والقراءة: ${value}`, "green");

    // حذف المفتاح التجريبي
    await client.del("test_key");
    log("✅ تم حذف المفتاح التجريبي", "green");

    await client.quit();
    return true;
  } catch (error) {
    log(`⚠️  Redis غير متوفر (اختياري)`, "yellow");
    log(`   ${error.message}`, "yellow");
    return false;
  }
}

// ==============================================
// تشغيل جميع الاختبارات
// ==============================================
async function runAllTests() {
  log("═══════════════════════════════════════════════", "cyan");
  log("🧪 اختبار الاتصال بقواعد البيانات - EduHub", "cyan");
  log("═══════════════════════════════════════════════", "cyan");

  const results = {
    postgresql: false,
    mongodb: false,
    redis: false,
  };

  // اختبار PostgreSQL
  results.postgresql = await testPostgreSQL();

  // اختبار MongoDB
  results.mongodb = await testMongoDB();

  // اختبار Redis (اختياري)
  results.redis = await testRedis();

  // النتيجة النهائية
  log("\n═══════════════════════════════════════════════", "cyan");
  log("📊 ملخص النتائج:", "cyan");
  log("═══════════════════════════════════════════════", "cyan");

  log(
    `PostgreSQL: ${results.postgresql ? "✅ يعمل" : "❌ لا يعمل"}`,
    results.postgresql ? "green" : "red",
  );
  log(
    `MongoDB:    ${results.mongodb ? "✅ يعمل" : "❌ لا يعمل"}`,
    results.mongodb ? "green" : "red",
  );
  log(
    `Redis:      ${results.redis ? "✅ يعمل" : "⚠️  غير متوفر (اختياري)"}`,
    results.redis ? "green" : "yellow",
  );

  const requiredDatabases = results.postgresql && results.mongodb;

  if (requiredDatabases) {
    log("\n🎉 رائع! جميع قواعد البيانات الضرورية تعمل بنجاح!", "green");
    log("✅ أنت جاهز للبدء في تطوير المشروع!", "green");
  } else {
    log("\n⚠️  بعض قواعد البيانات الضرورية لا تعمل", "yellow");
    log("📝 راجع الأخطاء أعلاه وحاول إصلاحها", "yellow");
  }

  log("\n═══════════════════════════════════════════════\n", "cyan");
}

// تشغيل الاختبارات
runAllTests().catch(console.error);
