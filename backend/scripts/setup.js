require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function setup() {
  try {
    console.log('--- 🚀 SiviOn Database Setup Started ---');

    // 1. Connection Check
    console.log('Step 1: Checking database connection...');
    await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully!');

    // 2. Schema Migration
    console.log('Step 2: Running schema migration...');
    const schemaPath = path.join(__dirname, '..', 'database_schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schemaSql);
    console.log('✅ Database schema verified/updated!');

    // 3. Status Column Sync (For existing tables)
    console.log('Step 3: Synchronizing database columns...');
    await pool.query(`
      ALTER TABLE IF EXISTS job_applications ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';
      ALTER TABLE IF EXISTS consultations ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';
      ALTER TABLE IF EXISTS blogs ADD COLUMN IF NOT EXISTS card_bg VARCHAR(255);
      ALTER TABLE IF EXISTS portfolio_projects ADD COLUMN IF NOT EXISTS card_bg VARCHAR(255);
    `);
    console.log('✅ Columns synchronized (status, card_bg)!');

    // 4. Default Admin Seeding
    console.log('Step 4: Checking for default admin...');
    const adminEmail = 'hr@sivionglobaltechnologies.com';

    const adminCheck = await pool.query('SELECT id FROM admins WHERE email = $1', [adminEmail]);
    
    if (adminCheck.rows.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await pool.query(
        "INSERT INTO admins (name, email, password_hash, role) VALUES ($1, $2, $3, $4)",
        ['System Admin', adminEmail, hash, 'superadmin']
      );
      console.log(`✅ Default admin created: ${adminEmail} (Pass: admin123)`);
    } else {
      console.log('ℹ️ Admin account already exists.');
    }

    // 5. Job Positions Seeding
    console.log('Step 5: Checking for default job positions...');
    const posCheck = await pool.query('SELECT COUNT(*) FROM job_positions');
    if (parseInt(posCheck.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO job_positions (title, location, type, department, description) VALUES
        ('Senior Java Developer', 'Remote / US', 'Full-time', 'Engineering', 'Build mission-critical enterprise Java applications.'),
        ('React Frontend Engineer', 'Remote / US', 'Full-time', 'Engineering', 'Create stunning, high-performance React applications.'),
        ('Digital Marketing Specialist', 'New York, US', 'Full-time', 'Marketing', 'Drive enterprise-grade digital marketing campaigns.'),
        ('SEO Executive', 'Remote / India', 'Contract', 'Marketing', 'Execute advanced SEO strategies to dominate search rankings.')
      `);
      console.log('✅ Default job positions seeded!');
    } else {
      console.log('ℹ️ Job positions already exist.');
    }

    // 6. Final Table List
    console.log('\n--- 📊 Final Database State ---');
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Existing Tables:', tables.rows.map(t => t.table_name).join(', '));

    console.log('\n--- ✨ Setup Completed Successfully! ---');

  } catch (error) {
    console.error('\n❌ Setup Failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setup();
