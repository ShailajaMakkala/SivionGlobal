const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // Multer middleware

router.get('/', portfolioController.getPortfolio);

// Admin routes (Protected) with file upload handling
const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'card_bg', maxCount: 1 }]);
router.post('/', authMiddleware, cpUpload, portfolioController.createProject);
router.put('/:id', authMiddleware, cpUpload, portfolioController.updateProject);
router.delete('/:id', authMiddleware, portfolioController.deleteProject);

module.exports = router;
