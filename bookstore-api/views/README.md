# 📚 Bookstore Management API
A professional RESTful API built for managing a bookstore database.

## 🌟 Key Features
- **Full CRUD Operations:** Add, view, update, and delete books.
- **User Authentication:** Secure **Signup & Login** using JWT and Bcrypt hashing.
- **Search & Filtering:** Search books by title/author and filter by price via URL queries.
- **Input Validation:** Data integrity ensured using `express-validator`.
- **Protected Routes:** Critical actions (Delete/Update) require a valid JWT token.

## 🛠️ Tech Stack
- **Node.js & Express.js** (Backend)
- **MongoDB Atlas** (Database)
- **Mongoose** (ODM)
- **JWT & BcryptJS** (Security)

---

## 🚀 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/signup` | Create a new account |
| POST | `/api/auth/login` | Login and get Access Token |

### 📖 Books (Public & Protected)
| Method | Endpoint | Description | Auth Required? |
| :--- | :--- | :--- | :--- |
| GET | `/api/books` | Get all books (supports search filters) | No |
| GET | `/api/books/:id` | Get a specific book by ID | No |
| POST | `/api/books` | Add a new book | **Yes** |
| PUT | `/api/books/:id` | Update book details | **Yes** |
| DELETE | `/api/books/:id` | Delete a book | **Yes** |

---

## ⚙️ Setup & Installation

1. **Clone the project:**
   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_LINK>