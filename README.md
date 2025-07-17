# CRUD With JWT– Backend

This is a Node.js backend application using Express, Sequelize (MySQL), and JWT authentication. It provides APIs for managing categories and services, with admin authentication.

---

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features

- JWT-based admin authentication
- CRUD operations for categories (admin only)
- CRUD operations for services under categories (admin only)
- Service price options (Hourly, Weekly, Monthly)
- MySQL database integration via Sequelize ORM

---

## API Endpoints

All endpoints are prefixed with `/api` and require a Bearer JWT token in the `Authorization` header (except `/login`).

### Auth

- **POST** `/api/login`
  - **Body:** `{ "email": "ADMIN_MAIL", "password": "YOUR_PASSWORD" }`
  - **Response:** `{ "token": "<JWT>" }`
  - _Only the hardcoded admin can log in._

---

### Category

- **POST** `/api/category`

  - **Body:** `{ "name": "Category Name" }`
  - **Description:** Create a new category (admin only).

- **GET** `/api/category`

  - **Description:** Get all categories (admin only).

- **PUT** `/api/category/:categoryId`

  - **Body:** `{ "name": "New Name" }`
  - **Description:** Update a category by ID (admin only).

- **DELETE** `/api/category/:categoryId`
  - **Description:** Delete a category by ID (only if it has no services, admin only).

---

### Service

- **POST** `/api/category/:categoryId/service`

  - **Body:**
    ```json
    {
      "name": "Service Name",
      "type": "Normal|VIP",
      "priceOptions": [{ "duration": "1 hour", "price": 100, "type": "Hourly" }]
    }
    ```
  - **Description:** Add a service to a category (admin only).

- **GET** `/api/category/:categoryId/services`

  - **Description:** Get all services for a category (admin only).

- **PUT** `/api/category/:categoryId/service/:serviceId`

  - **Body:** Same as POST body.
  - **Description:** Update a service and its price options (admin only).

- **DELETE** `/api/category/:categoryId/service/:serviceId`
  - **Description:** Delete a service by ID (admin only).

---

## Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd Code_for_tomorrow_indore
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Create a `.env` file in the root directory.
   - Add the following variables (see below).

4. **Start the server:**
   ```bash
   npm start
   ```
   The server will run on the port specified in your `.env` (default: 5000).

---

## Environment Variables

Create a `.env` file with the following variables:

```
NODE_ENV=development
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password

JWT_SECRET=your_jwt_secret
```

- `NODE_ENV`: `development` or `production`
- `PORT`: Port for the server (default: 5000)
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`: MySQL database connection details
- `JWT_SECRET`: Secret key for signing JWT tokens

---

## Project Structure

```
.
├── config/                 # Database and app config
├── controllers/            # Route controllers
├── middlewares/            # Express middlewares (e.g., auth)
├── models/                 # Sequelize models
├── routes/                 # Express route definitions
├── server.js               # App entry point
├── constants.js            # App-wide constants
├── package.json
└── README.md
```

---

## License

ISC

---

**Note:**

- Only the hardcoded admin (`admin@codesfortomorrow.com` / `Admin123!@#`) can log in and access the API.
- All endpoints except `/login` require a valid JWT in the `Authorization` header:  
  `Authorization: Bearer <token>`
