const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sekar-swiss')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));

// Routes
const quoteRoutes = require('./routes/quoteRoutes');
app.use('/api', quoteRoutes);

// Basic routes
app.get('/', (req, res) => {
    res.json({ message: 'Sekar Swiss API', status: 'running' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
