require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { seedDatabase } = require('./config/seed');

const contactRoutes = require('./routes/contact.routes');
const projectRoutes = require('./routes/project.routes');
const serviceRoutes = require('./routes/service.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const clientRoutes = require('./routes/client.routes');
const authRoutes = require('./routes/auth.routes');
const statsRoutes = require('./routes/stats.routes');

const app = express();

const configureApp = () => {
  app.use(helmet());
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  }));
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/contacts', contactRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/testimonials', testimonialRoutes);
  app.use('/api/clients', clientRoutes);
  app.use('/api/stats', statsRoutes);

  app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  });
};

const startServer = async () => {
  await connectDB();

  if (process.env.USE_IN_MEMORY_DB === 'true') {
    await seedDatabase({ clearExisting: false });
  }

  configureApp();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} [${process.env.NODE_ENV}]`);
  });
};

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
