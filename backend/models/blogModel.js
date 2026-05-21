const db = require('../config/db');

class Blog {
  static async create({ title, slug, content, image, card_bg, author, file_type }) {
    const query = `
      INSERT INTO blogs (title, slug, content, image, card_bg, author, file_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [title, slug, content, image, card_bg, author, file_type];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = `SELECT * FROM blogs ORDER BY created_at DESC;`;
    const { rows } = await db.query(query);
    return rows;
  }

  static async getBySlug(slug) {
    const query = `SELECT * FROM blogs WHERE slug = $1;`;
    const { rows } = await db.query(query, [slug]);
    return rows[0];
  }

  static async update(id, { title, slug, content, image, card_bg, author }) {
    const query = `
      UPDATE blogs 
      SET title = $1, slug = $2, content = $3, image = $4, card_bg = $5, author = $6 
      WHERE id = $7
      RETURNING *;
    `;
    const values = [title, slug, content, image, card_bg, author, id];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = `DELETE FROM blogs WHERE id = $1 RETURNING *;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Blog;
