const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // 1. Header se token nikalna
    const token = req.header('x-auth-token');

    // 2. Agar token nahi hai
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        // 3. Token ko verify karna
        const decoded = jwt.verify(token, 'secret_key_123');
        req.user = decoded;
        next(); // Aglay function (Controller) par jao
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = { protect };