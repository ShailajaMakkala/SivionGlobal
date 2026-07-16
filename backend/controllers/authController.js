const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const admin = await Admin.findByEmail(email);
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    res.status(200).json({ success: true, token, admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Basic verification - should be disabled in production or restricted
    const existingAdmin = await Admin.findByEmail(email);
    if (existingAdmin) return res.status(400).json({ error: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({ name, email, password_hash });
    res.status(201).json({ success: true, data: newAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
};
