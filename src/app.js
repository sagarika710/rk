const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import Route Handlers
const movieRoutes = require('./routes/movieRoutes');
const adminRoutes = require('./routes/adminRoutes');
const promoRoutes = require('./routes/promoRoutes');
const queryRoutes = require('./routes/queryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const faqRoutes = require('./routes/faqRoutes');
const passRoutes = require('./routes/passRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const eventRoutes = require('./routes/eventRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.CORS_ORIGIN,
    'https://radhakrishnacinemax.onrender.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
].filter(Boolean);

// ============================================
// 1. MIDDLEWARE
// ============================================

// Security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            baseUri: ["'self'"],
            fontSrc: ["'self'", 'https:', 'data:', 'https://fonts.gstatic.com'],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
            scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.tailwindcss.com'],
            connectSrc: ["'self'", 'https://api.themoviedb.org'],
            frameSrc: ["'self'", 'https://www.youtube.com', 'https://youtube.com', 'https://www.google.com', 'https://maps.google.com'],
            objectSrc: ["'none'"],
            scriptSrcAttr: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// CORS (Allow Browser + Postman + Mobile Apps)
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

// Logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// 2. DATABASE CONNECTION
// ============================================
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.warn('⚠️ Continuing without a database connection. API routes backed by MongoDB may fail until MongoDB is reachable.');
    });

// ============================================
// 3. API ROUTES
// ============================================

app.get('/api', (req, res) => {
    res.send('🎬 Radhakrishna Cinemax API is Running...');
});

app.get('/', (req, res) => {
    res.send('🎬 Radhakrishna Cinemax API is Running...');
});

app.get('/api/health', (req, res) => {
    res.json({
        ok: true,
        service: 'rk-cinemax-api',
        databaseConnected: mongoose.connection.readyState === 1
    });
});

app.use('/api/movies', movieRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chatbotRoutes', chatbotRoutes);
app.use('/api/promos', promoRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/passes', passRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/services', serviceRoutes);

// ============================================
// 4. ERROR HANDLING
// ============================================

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        message: `Route not found - ${req.originalUrl}`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

// ============================================
// 5. START SERVER
// ============================================
const PORT = process.env.PORT || 5002;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
