
# Backend README

## Overview
This backend service supports the management of users, departments, and employees. It is built to handle authentication, CRUD operations, and specific data filtering requirements, while enforcing role-based access control.

---

## Features

1. **Authentication**
   - User login and signup endpoints with token-based authentication.
   - Role-based access control to differentiate permissions between managers and other users.

2. **Departments**
   - **Create**: Add new departments (restricted to managers).
   - **Read**: Retrieve a list of all departments.
   - **Update**: Edit department details (restricted to managers).
   - **Delete**: Remove departments (restricted to managers).

3. **Employees**
   - **Create**: Add new employees.
   - **Read**: Retrieve employee data.
   - **Update**: Edit employee details (restricted to managers).
   - **Delete**: Remove employees (restricted to managers).

4. **Filtering Employees**
   - Filter employees by location in ascending order. Employees whose locations start with 'A' appear at the top.
   - Filter employees by their names in ascending or descending order based on the selected filter.

---

## API Endpoints

### Authentication
- **POST /api/signup**: Create a new user account.
- **POST /api/login**: Log in to receive a JWT token for authentication.

### Departments
- **GET /api/departments**: Retrieve all departments.
- **POST /api/departments**: Create a new department (managers only).
- **PUT /api/departments/:id**: Update department details (managers only).
- **DELETE /api/departments/:id**: Delete a department (managers only).

### Employees
- **GET /api/employees**: Retrieve all employees.
- **POST /api/employees**: Add a new employee.
- **PUT /api/employees/:id**: Update an employee's details (managers only).
- **DELETE /api/employees/:id**: Delete an employee (managers only).

### Filtering
- **GET /api/employees/filter/location**: Retrieve employees sorted by location in ascending order.
- **GET /api/employees/filter/name**: Retrieve employees sorted by name in ascending or descending order based on a query parameter.

---

## Role-Based Access Control
- **Manager**: Can create, read, update, and delete departments and employees.
- **Other Users**: Can only read departments and employees.

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Created a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Run the Server**:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:5000` by default.

5. **API Testing**:
   Used thunderclient to test the endpoints.

---

## Error Handling
- Proper error responses are returned for invalid requests, including 400, 401, and 403 HTTP status codes.
- Validation for required fields is implemented for all endpoints.

---

## Future Enhancements
- Add search functionality for departments and employees.
- Implement pagination for retrieving large datasets.
- Enhance filtering options for more complex queries.

---