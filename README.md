
# Blog Platform Backend

## 📚 **Project Overview**
This project is a backend application for a blogging platform that allows users to create, update, delete, and read blogs. The system supports **role-based access control**, secure **authentication**, and **public APIs** for viewing blogs with **search, sort, and filter** functionalities.

---

## 🚀 **Features**

### **User Roles**
1. **Admin**
   - Can delete any blog.
   - Can block any user by updating the `isBlocked` property.
   - Cannot update any blog.
2. **User**
   - Can register and log in.
   - Can create, update, and delete their own blogs.
   - Cannot perform admin-specific actions.

---

### **Authentication & Authorization**
- **Authentication**: 
  Users must log in to perform write, update, and delete operations.
- **Authorization**: 
  Admin and User roles are secured with strict access control.

---

### **Public Blog API**
- A public API to view blogs.
- Includes features for:
  - **Search**: Search blogs by title or content (e.g., search=blogtitle)..
  - **SortBy**: Sort blogs by fields like `createdAt` or `title` (e.g., sortBy=title)..
  - **SortOrder**: Sort blogs by fields like asc (ascending) or desc (descending). (e.g., sortOrder=desc).
  - **Filtering**: Filter blogs by author ID (e.g., filter=authorId).

---

### **Error Handling**
A consistent error handling mechanism is implemented across the application, with the following structure:
```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400,
  "error": {"details": "Additional error details, if applicable"},
  "stack": "error stack trace, if available"
}
```

---

## 🛠 **Technologies Used**
- **Programming Language**: TypeScript
- **Framework**: Node.js with Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT-based authentication
- **Validation**: Zod validation library

---

## 📄 **API Documentation**

### **1. Authentication**
#### Register User
- **POST** `/api/auth/register`
- Registers a new user.

#### Login User
- **POST** `/api/auth/login`
- Authenticates a user and generates a JWT token.

---

### **2. Blog Management**
#### Create Blog
- **POST** `/api/blogs`
- Creates a blog for the logged-in user.

#### Update Blog
- **PATCH** `/api/blogs/:id`
- Updates the blog for the logged-in user.

#### Delete Blog
- **DELETE** `/api/blogs/:id`
- Deletes the blog for the logged-in user.

#### Get All Blogs
- **GET** `/api/blogs`
- Fetches all blogs with search, sort, and filter functionality.

---

### **3. Admin Actions**
#### Block User
- **PATCH** `/api/admin/users/:userId/block`
- Blocks a user by setting `isBlocked` to true.

#### Delete Blog
- **DELETE** `/api/admin/blogs/:id`
- Deletes any blog by its ID.

---

## 🗂 **Database Models**
### **User Model**
| Field       | Type       | Description                          |
|-------------|------------|--------------------------------------|
| `name`      | `string`   | Full name of the user.               |
| `email`     | `string`   | Email address of the user.           |
| `password`  | `string`   | Securely stored password.            |
| `role`      | `"admin"` or `"user"` | User role, default is `"user"`. |
| `isBlocked` | `boolean`  | Indicates if the user is blocked.    |
| `createdAt` | `Date`     | Timestamp when the user was created. |
| `updatedAt` | `Date`     | Timestamp of the last user update.   |

### **Blog Model**
| Field         | Type       | Description                                |
|---------------|------------|--------------------------------------------|
| `title`       | `string`   | Title of the blog post.                   |
| `content`     | `string`   | Main content of the blog post.            |
| `author`      | `ObjectId` | Reference to the User model.              |
| `isPublished` | `boolean`  | Indicates if the blog is published.       |
| `createdAt`   | `Date`     | Timestamp when the blog was created.      |
| `updatedAt`   | `Date`     | Timestamp of the last blog update.        |

---

## 💻 **Setup Instructions**

### **Prerequisites**
- Node.js (v16+)
- MongoDB (local or cloud-based)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/moshiur111/blog-project-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-project-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and configure the following variables:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=<your-mongodb-url>
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRETT=<your-jwt-secret>
   JWT_ACCESS_EXPIRES_IN
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

## 🧑‍💻 **Admin Credentials**
- **Email**: `admin@example.com`
- **Password**: `adminpassword`

---

---

## 🔗 **Repository and Deployment Link**
- **GitHub Repository Link:** [Blog Project Backend](https://github.com/moshiur111/blog-project-backend.git)  
- **Live Deployment Link:** [Live API Link](https://blog-project-backend-theta.vercel.app)  

---

## 🎥 **Project Overview**
- [Project Explanation Video Link](#)

---

## ✍ **Contributors**
- **Muhammd Moshiur Rhamman** (Repository Author)

---