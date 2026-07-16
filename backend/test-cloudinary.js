require('dotenv').config();
const { uploadFileToCloudinary } = require('./config/cloudinary');
uploadFileToCloudinary('test.png', '/uploads/test.png')
  .then(res => console.log('SUCCESS:', res.secure_url))
  .catch(err => console.error('ERROR:', err));
