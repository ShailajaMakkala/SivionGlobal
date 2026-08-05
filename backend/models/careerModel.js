const db = require('../config/db');

class Career {
  static async create({ name, email, phone, position, resume_url }) {
    const query = `
      INSERT INTO job_applications (name, email, phone, position, resume_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, email, phone, position, resume_url];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const query = `SELECT * FROM job_applications ORDER BY created_at DESC;`;
    const { rows } = await db.query(query);
    return rows;
  }

  static async deleteById(id) {
    const query = `DELETE FROM job_applications WHERE id = $1 RETURNING *;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE job_applications 
      SET status = $1 
      WHERE id = $2 
      RETURNING *;
    `;
    const { rows } = await db.query(query, [status, id]);
    return rows[0];
  }

  static async getById(id) {
    const query = `SELECT * FROM job_applications WHERE id = $1;`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Career;
