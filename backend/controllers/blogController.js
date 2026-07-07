const Blog = require('../models/blogModel');
const path = require('path');
const { uploadFileToCloudinary } = require('../config/cloudinary');

const toRelativeUploadPath = (filePath) => {
  const uploadsDir = path.join(__dirname, '..');
  const relative = path.relative(uploadsDir, filePath).replace(/\\/g, '/');
  return '/' + relative;
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Server error while fetching blogs' });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.getBySlug(req.params.slug);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching blog' });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, focus_keywords, meta_description } = req.body;
    let slug = (req.body.slug || '').trim().replace(/^\/+/, '');
    let image = req.body.image;
    let file_type = undefined;

    if (req.files) {
      if (req.files.image && req.files.image.length > 0) {
        const file = req.files.image[0];
        image = toRelativeUploadPath(file.path);
        file_type = file.mimetype;

        if (process.env.CLOUDINARY_CLOUD_NAME) {
          uploadFileToCloudinary(file.path, image).catch((cloudErr) => {
            console.error('Failed to upload image to Cloudinary in background:', cloudErr);
          });
        }
      }
    }

    const newBlog = await Blog.create({ title, slug, content, image, category, focus_keywords, meta_description, file_type });
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Server error while creating blog' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, category, focus_keywords, meta_description } = req.body;
    let slug = (req.body.slug || '').trim().replace(/^\/+/, '');
    let image = req.body.image;

    if (req.files) {
      if (req.files.image && req.files.image.length > 0) {
        const file = req.files.image[0];
        image = toRelativeUploadPath(file.path);

        if (process.env.CLOUDINARY_CLOUD_NAME) {
          uploadFileToCloudinary(file.path, image).catch((cloudErr) => {
            console.error('Failed to upload image to Cloudinary in background:', cloudErr);
          });
        }
      }
    }

    const updated = await Blog.update(req.params.id, { title, slug, content, image, category, focus_keywords, meta_description });
    if (!updated) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Server error while updating blog' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting blog' });
  }
};
