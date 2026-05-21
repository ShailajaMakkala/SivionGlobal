const db = require('../config/db');

class Portfolio {
  static async create({ title, description, image, card_bg, technologies, category, client, file_type, live_url }) {
    const query = `
      INSERT INTO portfolio_projects (title, description, image, card_bg, technologies, category, client, file_type, live_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [title, description, image, card_bg, technologies, category, client, file_type, live_url];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = `SELECT * FROM portfolio_projects ORDER BY created_at DESC;`;
    const { rows } = await db.query(query);
    return rows;
  }

  static async update(id, { title, description, image, card_bg, technologies, category, client, live_url }) {
    const query = `
      UPDATE portfolio_projects 
      SET title = $1, description = $2, image = $3, card_bg = $4, technologies = $5, category = $6, client = $7, live_url = $8 
      WHERE id = $9
      RETURNING *;
    `;
    const values = [title, description, image, card_bg, technologies, category, client, live_url, id];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = `DELETE FROM portfolio_projects WHERE id = $1 RETURNING *;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Portfolio;
