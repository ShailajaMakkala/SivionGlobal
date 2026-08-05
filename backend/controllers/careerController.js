const Career = require('../models/careerModel');
const { uploadBufferToCloudinary } = require('../config/cloudinary');

exports.submitApplication = async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;

    console.log('=== NEW APPLICATION ===');
    console.log('Body:', { name, email, phone, position });
    console.log('File received:', req.file ? `${req.file.originalname} (${req.file.mimetype}, ${req.file.size} bytes)` : 'NO FILE');

    if (!name || !email || !position) {
      return res.status(400).json({ error: 'Missing required fields (name, email, position)' });
    }

    let resume_url = '';

    if (req.file && req.file.buffer) {
      try {
        const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const timestamp = Date.now();
        const publicId = `resumes/${safeName}_${timestamp}.pdf`;

        console.log('Uploading to Cloudinary, publicId:', publicId);

        // Upload as raw with .pdf extension so browser knows the file type
        const result = await uploadBufferToCloudinary(req.file.buffer, publicId, 'raw');

        // Transform URL to use fl_attachment:false so it displays inline instead of downloading
        resume_url = result.secure_url.replace('/raw/upload/', '/raw/upload/fl_attachment:false/');

        console.log('✅ Cloudinary upload success:', resume_url);
      } catch (uploadErr) {
        console.error('❌ Cloudinary upload failed:', uploadErr.message || uploadErr);
        resume_url = '';
      }
    } else {
      console.log('No file in request - either not provided or multer rejected it');
    }

    const application = await Career.create({ name, email, phone, position, resume_url });
    console.log('Application saved, resume_url in DB:', resume_url);

    res.status(201).json({ success: true, data: application, message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ error: 'Server error while submitting application' });
  }
};


exports.getApplications = async (req, res) => {
  try {
    const applications = await Career.getAll();
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Server error while fetching applications' });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await Career.deleteById(id);
    res.status(200).json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Server error while deleting application' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });
    const updated = await Career.updateStatus(id, status);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Server error while updating application status' });
  }
};

exports.viewResume = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Career.getById(id);
    if (!application || !application.resume_url) {
      return res.status(404).send('Resume not found');
    }

    const applicantName = application.name || 'Applicant';
    const pdfStreamUrl = `/api/careers/${id}/resume-pdf`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${applicantName} - Resume</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #525659;
    }
    embed, iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
</head>
<body>
  <embed src="${pdfStreamUrl}" type="application/pdf" width="100%" height="100%" />
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error in viewResume:', error);
    res.status(500).send('Server error');
  }
};

exports.viewResumePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Career.getById(id);
    if (!application || !application.resume_url) {
      return res.status(404).send('Resume not found');
    }

    const safeName = (application.name || 'Applicant').replace(/[^a-z0-9]/gi, '_');
    const filename = `${safeName}_Resume.pdf`;

    const https = require('https');
    const http = require('http');
    const client = application.resume_url.startsWith('https') ? https : http;

    client.get(application.resume_url, (stream) => {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      stream.pipe(res);
    }).on('error', (err) => {
      console.error('Error streaming resume from Cloudinary:', err);
      res.status(500).send('Error streaming resume');
    });
  } catch (error) {
    console.error('Error in viewResumePdf:', error);
    res.status(500).send('Server error');
  }
};
