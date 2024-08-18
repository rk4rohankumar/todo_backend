---

# To-Do App Backend

This is the backend for a To-Do application, built using Express.js and MongoDB. It provides a RESTful API for managing user authentication and CRUD operations on to-do items. The backend also includes JWT-based authentication, validation using Zod, and password hashing using bcrypt.

## Features

- **User Authentication:**
  - **Sign Up:** Register a new user on the platform. Passwords are securely hashed before being stored.
  - **Sign In:** Authenticate an existing user and issue a JWT token. Passwords are compared using bcrypt.

- **To-Do Management:**
  - **Create To-Do:** Add a new to-do item for an authenticated user.
  - **Read To-Do:**
    - Fetch all to-do items for a specific user.
    - Fetch a specific to-do item by its ID.
  - **Update To-Do:** Modify an existing to-do item.
  - **Delete To-Do:** Remove a to-do item from the user's list.

- **User-Specific Operations:**
  - **Fetch User To-Dos:** Retrieve all to-do items associated with a specific user.
  - **Fetch To-Do with Owner Information:** Fetch a to-do item by its ID and return it along with its owner's information.

## Technologies Used

- **Node.js** and **Express.js**: For building the backend server and API routes.
- **MongoDB** and **Mongoose**: For the database and object data modeling (ODM).
- **JSON Web Tokens (JWT)**: For securing API endpoints with authentication.
- **bcrypt**: For hashing passwords before storing them in the database.
- **Zod**: For schema validation of user input.
- **dotenv**: For environment variable management.

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/todo-app-backend.git
   cd todo-app-backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   - Create a `.env` file in the root of the project.
   - Add the following environment variables:
     ```
     MONGO_URI=your_mongo_database_uri
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the Server:**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

## API Endpoints

### User Authentication

- **POST /api/signup**
  - Register a new user. Passwords are hashed using bcrypt.
  - Request Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`

- **POST /api/signin**
  - Sign in an existing user. Passwords are compared using bcrypt.
  - Request Body: `{ "email": "john@example.com", "password": "password123" }`

### To-Do Management

- **POST /api/create**
  - Create a new to-do item.
  - Requires JWT in the `Authorization` header.
  - Request Body: `{ "title": "Buy groceries", "description": "Milk, Eggs, Bread" }`

- **GET /api/todo**
  - Fetch all to-do items for all users (for testing purposes, usually restricted).
  
- **GET /api/todo/:id**
  - Fetch a specific to-do item by its ID.
  - Requires JWT in the `Authorization` header.

- **PUT /api/update/:id**
  - Update an existing to-do item by its ID.
  - Requires JWT in the `Authorization` header.
  - Request Body: `{ "title": "Updated Title", "description": "Updated Description" }`

- **DELETE /api/delete/:id**
  - Delete a to-do item by its ID.
  - Requires JWT in the `Authorization` header.

- **GET /api/user/**
  - Fetch all to-do items for the authenticated user.
  - Requires JWT in the `Authorization` header.

### Middleware

- **userMiddleware**
  - Applied to routes that require user authentication.
  - Validates the JWT token and decodes the user information.

## Dependencies

```json
"dependencies": {
  "bcrypt": "^5.1.0",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.5.3",
  "zod": "^3.0.0"
}
```

## License

This project is licensed under the MIT License.

---