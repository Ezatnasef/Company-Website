const Contact = require('../models/Contact.model');
const nodemailer = require('nodemailer');

const sendNotificationEmail = async (contact) => {
  if (!process.env.MAIL_USER) return;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 طلب جديد من ${contact.name}`,
      html: `
        <div dir="rtl" style="font-family:sans-serif;padding:20px;">
          <h2 style="color:#6C3BFF">طلب جديد من الموقع</h2>
          <p><strong>الاسم:</strong> ${contact.name}</p>
          <p><strong>الهاتف:</strong> ${contact.phone}</p>
          <p><strong>البريد:</strong> ${contact.email}</p>
          <p><strong>الخدمة:</strong> ${contact.service}</p>
          <p><strong>الوصف:</strong> ${contact.description}</p>
        </div>`,
    });
  } catch (err) {
    console.warn('Email not sent:', err.message);
  }
};

// POST /api/contacts — Public
exports.create = async (req, res) => {
  try {
    const { name, phone, email, service, description } = req.body;
    if (!name || !phone || !email || !service || !description)
      return res.status(400).json({ success: false, message: 'All fields are required' });

    const contact = await Contact.create({ name, phone, email, service, description });
    await sendNotificationEmail(contact);

    res.status(201).json({ success: true, message: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.', data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/contacts — Admin
exports.getAll = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, data: contacts, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/contacts/:id — Admin
exports.updateStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true, runValidators: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/contacts/:id — Admin
exports.remove = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
