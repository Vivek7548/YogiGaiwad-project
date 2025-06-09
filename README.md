# Book Review API

A comprehensive RESTful API for a Book Review system built with Node.js, Express, MongoDB Atlas, and JWT authentication. This API allows users to register, login, add books, write reviews, and search for books with various filtering options.

---

## 📋 Table of Contents
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Error Handling](#-error-handling)
- [Testing](#-testing)
- [Design Decisions](#-design-decisions)
- [Future Enhancements](#-future-enhancements)

---

## 🚀 Features

### User Management
- User registration and authentication
- JWT-based secure authentication
- Password hashing for security

### Book Management
- Add new books with detailed information
- List all books with pagination
- Filter books by author, genre, or publication year
- Search books by title or author (case-insensitive)
- View detailed information about specific books

### Review System
- Add reviews for books (one review per user per book)
- Rate books on a scale of 1-5
- Update or delete your own reviews
- View average ratings for books
- Paginated reviews for each book

### Advanced Features
- Pagination for all list endpoints
- Filtering and sorting options
- Proper error handling and validation
- Protected routes for authenticated users

---

## 💻 Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Cloud Database)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Validation**: Express-validator
- **Development**: Nodemon for auto-reloading

---

## 🛠️ Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- MongoDB Atlas account (for cloud database) or local MongoDB installation

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bookreview?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_here
```

### 4. Database Setup
#### Option 1: MongoDB Atlas (Recommended)
1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Create a new cluster (free tier is sufficient)
3. Set up database access (create a user with password)
4. Set up network access (allow access from your IP or anywhere for development)
5. Get your connection string and add it to the `.env` file

#### Option 2: Local MongoDB
1. Install and start [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Update the MONGO_URI in your `.env` file to: `mongodb://localhost:27017/bookreview`

### 5. Run the Server
#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The API will be available at: [http://localhost:5000](http://localhost:5000)

---

## 📚 API Documentation

### Authentication Endpoints

#### Register a New User
- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
  ```json
  {
    "username": "user1",
    "password": "securepassword123"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "message": "User registered successfully",
    "userId": "60d21b4667d0d8992e610c85"
  }
  ```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
  ```json
  {
    "username": "user1",
    "password": "securepassword123"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "60d21b4667d0d8992e610c85"
  }
  ```

### Book Endpoints

#### Add a New Book
- **URL**: `/api/books`
- **Method**: `POST`
- **Auth Required**: Yes (JWT Token)
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic",
    "description": "A story of wealth, love, and the American Dream in the 1920s",
    "publishedYear": 1925
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "message": "Book added successfully",
    "book": {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Classic",
      "description": "A story of wealth, love, and the American Dream in the 1920s",
      "publishedYear": 1925,
      "createdAt": "2023-06-22T10:00:00.000Z"
    }
  }
  ```

#### Get All Books (with Pagination & Filters)
- **URL**: `/api/books?page=1&limit=10&author=Fitzgerald&genre=Classic`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `author`: Filter by author name (optional)
  - `genre`: Filter by genre (optional)
  - `year`: Filter by published year (optional)
- **Success Response**: `200 OK`
  ```json
  {
    "books": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Classic",
        "publishedYear": 1925,
        "averageRating": 4.5
      }
    ],
    "pagination": {
      "totalBooks": 1,
      "totalPages": 1,
      "currentPage": 1,
      "limit": 10
    }
  }
  ```

#### Get Book Details by ID
- **URL**: `/api/books/:id?page=1&limit=5`
- **Method**: `GET`
- **Auth Required**: No
- **URL Parameters**:
  - `id`: Book ID
- **Query Parameters**:
  - `page`: Page number for reviews (default: 1)
  - `limit`: Reviews per page (default: 5)
- **Success Response**: `200 OK`
  ```json
  {
    "book": {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Classic",
      "description": "A story of wealth, love, and the American Dream in the 1920s",
      "publishedYear": 1925,
      "averageRating": 4.5
    },
    "reviews": [
      {
        "_id": "60d21b4667d0d8992e610c86",
        "rating": 5,
        "comment": "A masterpiece of American literature",
        "user": {
          "_id": "60d21b4667d0d8992e610c87",
          "username": "user1"
        },
        "createdAt": "2023-06-22T10:30:00.000Z"
      }
    ],
    "pagination": {
      "totalReviews": 1,
      "totalPages": 1,
      "currentPage": 1,
      "limit": 5
    }
  }
  ```

#### Search Books
- **URL**: `/api/books/search?q=gatsby`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**:
  - `q`: Search term
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **Success Response**: `200 OK`
  ```json
  {
    "books": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Classic",
        "publishedYear": 1925,
        "averageRating": 4.5
      }
    ],
    "pagination": {
      "totalBooks": 1,
      "totalPages": 1,
      "currentPage": 1,
      "limit": 10
    }
  }
  ```

### Review Endpoints

#### Add a Review
- **URL**: `/api/books/:id/reviews`
- **Method**: `POST`
- **Auth Required**: Yes (JWT Token)
- **Headers**: `Authorization: Bearer <token>`
- **URL Parameters**:
  - `id`: Book ID
- **Body**:
  ```json
  {
    "rating": 5,
    "comment": "A masterpiece of American literature"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "message": "Review added successfully",
    "review": {
      "_id": "60d21b4667d0d8992e610c86",
      "rating": 5,
      "comment": "A masterpiece of American literature",
      "book": "60d21b4667d0d8992e610c85",
      "user": "60d21b4667d0d8992e610c87",
      "createdAt": "2023-06-22T10:30:00.000Z"
    }
  }
  ```

#### Update a Review
- **URL**: `/api/reviews/:id`
- **Method**: `PUT`
- **Auth Required**: Yes (JWT Token)
- **Headers**: `Authorization: Bearer <token>`
- **URL Parameters**:
  - `id`: Review ID
- **Body**:
  ```json
  {
    "rating": 4,
    "comment": "Updated review comment"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Review updated successfully",
    "review": {
      "_id": "60d21b4667d0d8992e610c86",
      "rating": 4,
      "comment": "Updated review comment",
      "book": "60d21b4667d0d8992e610c85",
      "user": "60d21b4667d0d8992e610c87",
      "updatedAt": "2023-06-22T11:00:00.000Z"
    }
  }
  ```

#### Delete a Review
- **URL**: `/api/reviews/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (JWT Token)
- **Headers**: `Authorization: Bearer <token>`
- **URL Parameters**:
  - `id`: Review ID
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Review deleted successfully"
  }
  ```

---

## 🗄️ Database Schema

### User Model
```javascript
{
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

### Book Model
```javascript
{
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

### Review Model
```javascript
{
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

---

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication:

1. **Token Generation**: When a user logs in successfully, the server generates a JWT token containing the user's ID.
2. **Token Usage**: For protected routes, include the token in the Authorization header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
3. **Token Verification**: The server verifies the token for all protected routes.
4. **Security**: Passwords are hashed using bcryptjs before storing in the database.

---

## ⚠️ Error Handling

The API implements comprehensive error handling:

- **Validation Errors**: Returns 400 Bad Request with details about validation failures
- **Authentication Errors**: Returns 401 Unauthorized for invalid or missing tokens
- **Authorization Errors**: Returns 403 Forbidden when users try to modify resources they don't own
- **Not Found Errors**: Returns 404 Not Found when requested resources don't exist
- **Server Errors**: Returns 500 Internal Server Error for unexpected server issues

---

## 🧪 Testing

### Running Tests
```bash
npm test
```

The API includes comprehensive tests for:
- Authentication flows
- Book CRUD operations
- Review management
- Error handling
- Input validation

---

## 💡 Design Decisions

- **JWT Authentication**: Chosen for stateless authentication, scalability, and security.
- **MongoDB**: Selected for its flexibility with document-based data and ease of scaling.
- **Express.js**: Used for its minimalist approach and robust middleware ecosystem.
- **Pagination**: Implemented on list endpoints to improve performance and user experience.
- **One Review Per User Per Book**: Enforced to maintain data integrity and prevent spam.
- **Middleware Architecture**: Used for authentication, validation, and error handling.

---

## 🔮 Future Enhancements

- User profiles with avatars and bio information
- Admin dashboard for content moderation
- Book categories and tags for better organization
- Social features (like, share, follow users)
- Book cover image uploads
- Advanced search with filters
- User roles and permissions
- Email notifications
- OAuth integration for social login

---

## 📚 API Testing Tools

For easier API testing, consider using:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [curl](https://curl.se/) (command-line tool)

Remember to include the JWT token in the `Authorization` header for protected routes:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/yourusername)
