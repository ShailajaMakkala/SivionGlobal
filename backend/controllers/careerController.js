const Career = require('../models/careerModel');

exports.submitApplication = async (req, res) => {
  try {
    const { name, email, phone, position } = req.body;
    
    if (!name || !email || !position) {
      return res.status(400).json({ error: 'Missing required fields (name, email, position)' });
    }

    // If a file was uploaded, store its original name as resume reference
    // In production you'd upload to S3/Cloudinary; here we store the filename
    const resume_url = req.file ? `uploaded:${req.file.originalname}` : null;

    const application = await Career.create({ name, email, phone, position, resume_url });
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
