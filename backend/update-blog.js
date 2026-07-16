const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();
const { uploadFileToCloudinary } = require('./config/cloudinary');

const frontendPath = path.join(__dirname, '..', 'frontend', 'public', 'uploads', 'portfolio', 'N8N.png');
const backendPath = path.join(__dirname, 'uploads', 'portfolio', 'N8N.png');

if (fs.existsSync(backendPath) && !fs.existsSync(frontendPath)) {
  fs.copyFileSync(backendPath, frontendPath);
  console.log('Copied to frontend');
}

const client = new Client({ connectionString: 'postgresql://neondb_owner:npg_eUFDwls1Cz6a@ep-little-sound-anra2n9e-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require' });
client.connect().then(async () => {
  try {
    let imageUrl = '/uploads/portfolio/N8N.png';
    // Let's also upload it to Cloudinary as requested
    if (process.env.CLOUDINARY_CLOUD_NAME && fs.existsSync(frontendPath)) {
      console.log('Uploading to Cloudinary...');
      const result = await uploadFileToCloudinary(frontendPath, imageUrl);
      imageUrl = result.secure_url;
      console.log('Cloudinary URL:', imageUrl);
    }
    
    const res = await client.query("UPDATE blogs SET image = $1 WHERE title ILIKE '%n8n%' RETURNING id, title, image;", [imageUrl]);
    console.log('Updated DB:', res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
});
