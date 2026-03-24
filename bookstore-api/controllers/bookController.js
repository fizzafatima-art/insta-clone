const Book = require('../models/Book');

// 1. Get All Books (With Search, Price Filter & Pagination)
exports.getAllBooks = async (req, res) => {
    try {
        // Query params se values nikalna
        const { title, author, maxPrice, page = 1, limit = 10 } = req.query;
        let query = {};

        // 1. Title search (Case Insensitive)
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        // 2. Author search (Case Insensitive)
        if (author) {
            query.author = { $regex: author, $options: 'i' };
        }

        // 3. Price filter (Books cheaper than maxPrice)
        if (maxPrice) {
            query.price = { $lte: Number(maxPrice) };
        }

        // 4. Pagination Logic
        const skip = (page - 1) * limit; // Kitni books skip karni hain

        const books = await Book.find(query)
            .limit(Number(limit))
            .skip(skip)
            .sort({ createdAt: -1 }); // Nayi books pehle dikhayega

        const totalBooks = await Book.countDocuments(query);

        res.status(200).json({ 
            success: true,
            total: totalBooks, 
            currentPage: Number(page),
            totalPages: Math.ceil(totalBooks / limit),
            books 
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Create Book
exports.createBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 3. Get Single Book
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 4. Update Book
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: "Book not found" });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 5. Delete Book
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};