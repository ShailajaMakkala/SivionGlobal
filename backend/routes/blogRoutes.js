const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../middleware/upload');

router.get('/', blogController.getBlogs);
router.get('/:slug', blogController.getBlogBySlug);

// Admin routes (Protected)
const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }]);
router.post('/', authMiddleware, cpUpload, blogController.createBlog);
router.put('/:id', authMiddleware, cpUpload, blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
