const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const careerController = require('../controllers/careerController');
const authMiddleware = require('../middleware/authMiddleware');

// Multer config: store in memory, accept PDF and common MIME types
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept application/pdf, octet-stream with .pdf extension, and binary data
    const isPdf = file.mimetype === 'application/pdf' ||
                  file.mimetype === 'application/octet-stream' ||
                  file.originalname.toLowerCase().endsWith('.pdf');
    if (isPdf) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post('/apply', upload.single('resume'), careerController.submitApplication);

router.get('/:id/resume-pdf', careerController.viewResumePdf);
router.get('/:id/resume/:filename', careerController.viewResume);
router.get('/:id/resume', careerController.viewResume);
router.get('/', authMiddleware, careerController.getApplications);
router.delete('/:id', authMiddleware, careerController.deleteApplication);
router.patch('/:id/status', authMiddleware, careerController.updateApplicationStatus);

module.exports = router;
