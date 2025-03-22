# Backend API for Companies and Contacts

This project implements a RESTful API that provides a CRUD interface for managing companies and their related contacts.

## Features

- **Authentication**: JWT-based authentication with username/password login
- **Companies Management**: Full CRUD operations with filtering, sorting, and pagination capabilities
- **Contacts Management**: Full CRUD operations including delete functionality
- **Company Address**: Companies can now store address information
- **Image Management**: Upload, update, and delete company images
- **API Documentation**: Swagger UI documentation for all endpoints
- **Automated Tests**: Jest tests covering main functionality

## Technology Stack

- **Node.js & Express**: Server framework
- **MongoDB**: Database using Mongoose ODM
- **JWT**: Authentication using JSON Web Tokens
- **Swagger**: API documentation
- **Jest & Supertest**: Testing framework
- **Multer**: File upload handling
- **Jimp**: Image processing

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible instance)
- Docker (optional, for containerized MongoDB)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment:

   - MongoDB connection details in `config/config.dev.js`:
     ```javascript
     config.dbs.sample_db.uri = "mongodb://localhost:27017";
     config.dbs.sample_db.database = "company-api";
     ```

4. Start MongoDB (if using Docker):

   ```bash
   docker run -d --name mongodb -p 27017:27017 mongo:latest
   ```

5. Initialize database with sample data:

   ```bash
   # Restore from the single-file MongoDB archive dump
   mongorestore --drop --archive=./db-dump/company-api.archive

   # Or run the initialization script (alternative)
   mongosh mongodb://localhost:27017/company-api db-dump/init-db.js
   ```

   This will create sample data including:

   - 1 admin user (username: "admin", password: "admin123")
   - 3 contacts with different details
   - 3 companies with various properties and statuses

6. Start the application:
   ```bash
   npm run start-dev
   ```

## API Usage

### Authentication

#### Register a new user

```bash
POST /v1/users/register
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

#### Login

```bash
POST /v1/users/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

The response will include a JWT token in the Authorization header, which should be used for subsequent requests.

### Companies

#### List Companies

```bash
GET /v1/companies?status=active&type[]=agent&sort_by=name&sort_order=asc&page=1&limit=10
Authorization: Bearer <token>
```

This endpoint supports:

- Filtering by status and type
- Sorting by name or creation date
- Pagination with page and limit parameters

#### Get Single Company

```bash
GET /v1/companies/:id
Authorization: Bearer <token>
```

#### Create Company

```bash
POST /v1/companies
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Example Company",
  "shortName": "ExCo",
  "businessEntity": "LLC",
  "address": "123 Business St, Business City",
  "contactId": "60d21b4c67d0d8992e610c85",
  "type": ["agent", "contractor"],
  "status": "active"
}
```

#### Update Company

```bash
PATCH /v1/companies/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Company Name",
  "address": "456 New Address Ave"
}
```

#### Delete Company

```bash
DELETE /v1/companies/:id
Authorization: Bearer <token>
```

#### Add Company Image

```bash
POST /v1/companies/:id/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <image-file>
```

#### Remove Company Image

```bash
DELETE /v1/companies/:id/image?image_name=filename.png
Authorization: Bearer <token>
```

### Contacts

#### Get Contact

```bash
GET /v1/contacts/:id
Authorization: Bearer <token>
```

#### Create Contact

```bash
POST /v1/contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "patronymic": "Smith",
  "phone": "79161234567",
  "email": "john.doe@example.com"
}
```

#### Update Contact

```bash
PATCH /v1/contacts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstname": "Jane",
  "email": "jane.doe@example.com"
}
```

#### Delete Contact

```bash
DELETE /v1/contacts/:id
Authorization: Bearer <token>
```

## Testing

Run tests with:

```bash
npm run test
```

This command runs Jest tests in an isolated test environment with a separate test database.

## Documentation

API documentation is available at:

```
http://localhost:2114/v1/docs
```

The Swagger UI provides details of all endpoints, their parameters, and response formats.

## Project Structure

```
├── DB
│   ├── DB.constant.js             # Database constants
│   └── sample-db                  # Database module
│       ├── methods                # Database methods
│       │   ├── company           # Company-related methods
│       │   ├── contact           # Contact-related methods
│       │   └── user              # User-related methods
│       └── schemas               # MongoDB schemas
├── config                         # Configuration files
├── constants                      # Constants definitions
├── db-dump                        # Database initialization scripts
├── middleware                     # Express middleware
├── public                         # Static assets
├── routes                         # API routes
│   ├── companies                 # Company endpoints
│   ├── contacts                  # Contact endpoints
│   ├── users                     # Auth endpoints
│   └── readme                    # Documentation endpoints
├── services                       # Services
└── tests                          # Tests
```

## Future Improvements

- Add role-based access control
- Implement refresh tokens for authentication
- Add more comprehensive validation
- Add cache layer for frequently accessed data
- Implement full-text search

## License

This project is licensed under the MIT License - see the LICENSE file for details.
