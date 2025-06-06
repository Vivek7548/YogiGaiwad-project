# Book Review API

A RESTful API for a Book Review system built with Node.js, Express, MongoDB, and JWT authentication.

---

## 🚀 Features
- User signup and login (JWT-based authentication)
- Add, list, and search books
- Add, update, and delete reviews (one per user per book)
- Pagination and filtering for books and reviews

---

## 🛠️ Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

---

## ⚡ Quick Start

### 1. Clone the Repository
```bash
# Replace <repo-url> with your repository URL
git clone <repo-url>
cd book-review-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret_here
```

### 4. Start MongoDB
- **Local:**
  - Make sure MongoDB is running on your machine. (Default: `mongodb://localhost:27017`)
- **Cloud:**
  - Update `MONGO_URI` in `.env` with your cloud connection string.

### 5. Run the Server
- **Development (with auto-reload):**
  ```bash
  npm run dev
  ```
- **Production:**
  ```bash
  npm start
  ```

The API will be available at: [http://localhost:5000](http://localhost:5000)

---

## 📬 Example API Requests

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","password":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","password":"pass123"}'
```

---

## 📚 Core API Features & Usage

### 1. Add a New Book (Authenticated)
**POST /api/books**
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Book Title","author":"Author Name","genre":"Fiction","description":"A great book","publishedYear":2024}'
```

### 2. Get All Books (with Pagination & Filters)
**GET /api/books?page=1&limit=10&author=Author&genre=Fiction**
```bash
curl "http://localhost:5000/api/books?page=1&limit=10&author=Author&genre=Fiction"
```

### 3. Get Book Details by ID (with Average Rating & Paginated Reviews)
**GET /api/books/:id?page=1&limit=5**
```bash
curl http://localhost:5000/api/books/<bookId>?page=1&limit=5
```
- Returns book details, average rating, and paginated reviews.

### 4. Submit a Review (Authenticated, One per User per Book)
**POST /api/books/:id/reviews**
```bash
curl -X POST http://localhost:5000/api/books/<bookId>/reviews \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"comment":"Great!"}'
```

### 5. Update Your Own Review
**PUT /api/reviews/:id**
```bash
curl -X PUT http://localhost:5000/api/reviews/<reviewId> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"rating":4,"comment":"Updated comment"}'
```

### 6. Delete Your Own Review
**DELETE /api/reviews/:id**
```bash
curl -X DELETE http://localhost:5000/api/reviews/<reviewId> \
  -H "Authorization: Bearer <token>"
```

### 7. Search Books by Title or Author (Partial, Case-Insensitive)
**GET /api/books/search?q=searchTerm**
```bash
curl "http://localhost:5000/api/books/search?q=harry"
```

---

## 🗄️ Database Schema
- **User:** `{ username, password }`
- **Book:** `{ title, author, genre, description, publishedYear }`
- **Review:** `{ book, user, rating, comment }` (one review per user per book)

---

## 💡 Design Decisions
- JWT is used for stateless authentication.
- Passwords are hashed with bcryptjs.
- MongoDB is used for simplicity and flexibility.
- Reviews are paginated and only editable/deletable by their authors.

---

## 📚 Tips
- Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) for easier API testing.
- Make sure to include the JWT token in the `Authorization` header for protected routes: `Bearer <token>`
- You can extend this API with features like user roles, book cover uploads, etc.

---

Feel free to extend this API with more features like user roles, book cover uploads, etc.
