require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bookRoutes = require('./routers/bookRoutes');
const authRoutes = require('./routers/authRoutes');

// 1. Pehle app ko create karein
const app = express();

// 2. Ab middlewares use karein
app.use(cors()); 
app.use(express.json());
app.use(express.static('public')); // Ab ye line error nahi degi ✅

// 3. Routes setup karein
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 4. Database connect karein
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ DB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));