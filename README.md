# Blog API

This project is a RESTful API for managing a blog platform. It allows users to create, read, update, and delete blog posts, as well as manage user accounts. The API is built using Node.js, Express.js, and MongoDB.

## Features

- **User Management**: Register new users, login, and retrieve user information.
- **Blog Management**: Create, read, update, and delete blog posts. Retrieve blogs by user.
- **Authentication**: Secure user authentication using bcrypt for password hashing.
- **Database**: MongoDB for storing user and blog data.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   CONNECTION_STRING=your_mongodb_connection_string
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

The server will start running on `http://localhost:5000`.

## API Endpoints

### User Endpoints

- **GET /routes/getuser**: Retrieve all users.
- **POST /routes/postuser**: Register a new user.
  - Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
- **POST /routes/login**: Login a user.
  - Request Body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

### Blog Endpoints

- **GET /blogroutes/getblog**: Retrieve all blogs.
- **POST /blogroutes/postblog**: Create a new blog post.
  - Request Body:
    ```json
    {
      "title": "My First Blog",
      "description": "This is the content of my first blog.",
      "image": "image-url",
      "user": "user-id"
    }
    ```
- **PUT /blogroutes/updateblog/:id**: Update a blog post.
  - Request Body:
    ```json
    {
      "title": "Updated Title",
      "description": "Updated content."
    }
    ```
- **GET /blogroutes/getblogbyid/:id**: Retrieve a blog post by ID.
- **DELETE /blogroutes/deleteblog/:id**: Delete a blog post by ID.
- **GET /blogroutes/getblogbyuser/:id**: Retrieve all blogs by a specific user.

## Dependencies

- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool.
- **bcryptjs**: Library for hashing passwords.
- **dotenv**: Module to load environment variables from a `.env` file.
- **nodemon**: Tool for automatically restarting the node application when file changes are detected.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

