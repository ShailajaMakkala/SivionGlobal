require('dotenv').config();
const db = require('./config/db');

async function fixSlugs() {
  try {
    const { rows } = await db.query('SELECT id, slug FROM blogs');
    let fixed = 0;
    for (const blog of rows) {
      if (blog.slug) {
        const cleaned = blog.slug.trim().replace(/^\/+/, '');
        if (cleaned !== blog.slug) {
          await db.query('UPDATE blogs SET slug = $1 WHERE id = $2', [cleaned, blog.id]);
          console.log(`Updated blog ${blog.id}: "${blog.slug}" -> "${cleaned}"`);
          fixed++;
        }
      }
    }
    console.log(`Fixed ${fixed} slugs.`);
  } catch (error) {
    console.error('Error fixing slugs:', error);
  } finally {
    process.exit();
  }
}

fixSlugs();
