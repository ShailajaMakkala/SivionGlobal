require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  try {
    // Clear the stale image paths for Varnika (id=31) so re-upload gives a fresh start
    await pool.query("UPDATE portfolio_projects SET image = '', card_bg = '' WHERE id = 31");
    console.log('Cleared stale image paths for Varnika Heritage Crafts');
    const res = await pool.query("SELECT id, title, image, card_bg FROM portfolio_projects WHERE id = 31");
    console.log('Updated record:', res.rows);
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

check();
