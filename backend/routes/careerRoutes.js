const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const careerController = require('../controllers/careerController');
const authMiddleware = require('../middleware/authMiddleware');

// Multer config: store in memory, accept only PDF
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post('/apply', upload.single('resume'), careerController.submitApplication);

// Admin routes (Protected)
router.get('/', authMiddleware, careerController.getApplications);
router.delete('/:id', authMiddleware, careerController.deleteApplication);
router.patch('/:id/status', authMiddleware, careerController.updateApplicationStatus);

module.exports = router;
