const Portfolio = require('../models/portfolioModel');
const path = require('path');
const { uploadFileToCloudinary } = require('../config/cloudinary');

// Convert absolute multer path to relative /uploads/... path
const toRelativeUploadPath = (filePath) => {
  const uploadsDir = path.join(__dirname, '..');
  const relative = path.relative(uploadsDir, filePath).replace(/\\/g, '/');
  return '/' + relative;
};

exports.getPortfolio = async (req, res) => {
  try {
    const projects = await Portfolio.getAll();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching portfolio' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, technologies, category, client, live_url } = req.body;
    let image = req.body.image;
    let card_bg = req.body.card_bg;
    let file_type = undefined;

    if (req.files) {
      if (req.files.image && req.files.image.length > 0) {
        const file = req.files.image[0];
        image = toRelativeUploadPath(file.path);
        file_type = file.mimetype;

        if (process.env.CLOUDINARY_CLOUD_NAME) {
          try {
            await uploadFileToCloudinary(file.path, image);
          } catch (cloudErr) {
            console.error('Failed to upload image to Cloudinary:', cloudErr);
          }
        }
      }
      if (req.files.card_bg && req.files.card_bg.length > 0) {
        const file = req.files.card_bg[0];
        card_bg = toRelativeUploadPath(file.path);

        if (process.env.CLOUDINARY_CLOUD_NAME) {
          try {
            await uploadFileToCloudinary(file.path, card_bg);
          } catch (cloudErr) {
            console.error('Failed to upload card_bg to Cloudinary:', cloudErr);
          }
        }
      }
    }
    
    const newProject = await Portfolio.create({ title, description, image, card_bg, technologies, category, client, file_type, live_url });
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Server error while creating project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, description, technologies, category, client, live_url } = req.body;
    let image = req.body.image;
    let card_bg = req.body.card_bg;

    if (req.files) {
      if (req.files.image && req.files.image.length > 0) {
        const file = req.files.image[0];
        image = toRelativeUploadPath(file.path);

        if (process.env.CLOUDINARY_CLOUD_NAME) {
          try {
            await uploadFileToCloudinary(file.path, image);
          } catch (cloudErr) {
            console.error('Failed to upload image to Cloudinary:', cloudErr);
          }
        }
      }
      if (req.files.card_bg && req.files.card_bg.length > 0) {
        const file = req.files.card_bg[0];
        card_bg = toRelativeUploadPath(file.path);

        if (process.env.CLOUDINARY_CLOUD_NAME) {
          try {
            await uploadFileToCloudinary(file.path, card_bg);
          } catch (cloudErr) {
            console.error('Failed to upload card_bg to Cloudinary:', cloudErr);
          }
        }
      }
    }

    const updated = await Portfolio.update(req.params.id, { title, description, image, card_bg, technologies, category, client, live_url });
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Server error while updating project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Portfolio.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting project' });
  }
};

