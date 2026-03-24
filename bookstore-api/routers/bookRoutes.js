const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bookController = require('../controllers/bookController');

// 1. Validation Middleware (For POST/PUT)
const validateBook = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('isbn').notEmpty().withMessage('ISBN is required'),
    body('publishedDate').isISO8601().withMessage('Valid date is required')
];

// --- ROUTES ---

// Sab dekh sakte hain
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// POST: protect hata diya taake token ki zaroorat na pare
router.post('/', validateBook, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
}, bookController.createBook);

// PUT: protect hata diya
router.put('/:id', bookController.updateBook);

// DELETE: protect hata diya
router.delete('/:id', bookController.deleteBook);

module.exports = router;