const { Client } = require("pg");

async function checkUsers() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "MoDB",
    user: "postgres",
    password: "Emadsaad",
  });

  try {
    await client.connect();
    console.log("✅ Connected to MoDB");

    const res = await client.query(
      'SELECT id, name, email, role, "createdAt" FROM users',
    );

    console.log("\n👥 Users found:", res.rowCount);
    console.table(res.rows);

    await client.end();
  } catch (err) {
    if (err.code === "42P01") {
      console.log(
        '⚠️  Table "users" does not exist yet (Register a user first!)',
      );
    } else {
      console.error("❌ Error executing query", err.stack);
    }
    // Don't keep the process hanging if connection failed
    try {
      await client.end();
    } catch {}
  }
}

checkUsers();
