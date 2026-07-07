require('dotenv').config();
const db = require('./config/db');

async function checkContent() {
  try {
    const { rows } = await db.query("SELECT content FROM blogs WHERE slug = 'ai-driven-solutions-for-business'");
    console.log(rows[0].content);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

checkContent();
