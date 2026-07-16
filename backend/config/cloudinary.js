const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary using env variables if present
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

/**
 * Uploads a local file to Cloudinary preserving the directory structure as public_id.
 * Once uploaded, it deletes the temporary local file.
 * 
 * @param {string} localFilePath - Full path to the local file
 * @param {string} relativePath - The relative path that will be stored in the DB (e.g. /uploads/portfolio/image.jpg)
 * @returns {Promise<object>} Cloudinary upload response
 */
const uploadFileToCloudinary = (localFilePath, relativePath) => {
  return new Promise((resolve, reject) => {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return reject(new Error('Cloudinary is not configured. Environment variables are missing.'));
    }

    // Normalize relative path: remove leading slash if present
    const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;

    // Get public_id without the file extension (e.g. uploads/portfolio/image-1234)
    const ext = path.extname(cleanPath);
    const publicId = cleanPath.substring(0, cleanPath.length - ext.length);

    cloudinary.uploader.upload(
      localFilePath,
      {
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        resource_type: 'auto'
      },
      (error, result) => {
        // Do not delete local file so it is permanently served from frontend/public
        /*
        try {
          if (process.env.NODE_ENV === 'production' && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
          }
        } catch (unlinkError) {
          console.error('Error deleting local temp file:', unlinkError);
        }
        */

        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  cloudinary,
  uploadFileToCloudinary
};
