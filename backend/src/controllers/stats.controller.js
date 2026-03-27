const Stats = require('../models/Stats.model');
const Contact = require('../models/Contact.model');
const Project = require('../models/Project.model');

// GET /api/stats — Public (site stats)
exports.getPublic = async (req, res) => {
  try {
    const stats = await Stats.findOne().sort({ createdAt: -1 });
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/stats/dashboard — Admin
exports.getDashboard = async (req, res) => {
  try {
    const [stats, totalContacts, newContacts, totalProjects] = await Promise.all([
      Stats.findOne().sort({ createdAt: -1 }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Project.countDocuments({ isActive: true }),
    ]);

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name phone service status createdAt');

    res.json({
      success: true,
      data: {
        siteStats: stats,
        totalContacts,
        newContacts,
        totalProjects,
        recentContacts,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/stats — Admin
exports.update = async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) stats = new Stats();
    Object.assign(stats, req.body);
    await stats.save();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
