This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


# Employee Management Dashboard (Frontend)

This is the frontend for an Employee Management Dashboard. It provides a seamless interface for employees and managers to perform a variety of tasks, including signing up, logging in, managing departments, viewing employee information, and filtering employee data based on various criteria.

## Features

### 1. **Signup/Login Page**
   - **Employees and Managers** can sign up or log in using their credentials.
   - Form validation and error handling for a smooth user experience.
   - Redirects users to their respective dashboards upon successful login.

### 2. **Department Management Page**
   - **Managers** have the ability to **create, update, and delete departments**.
   - Each department can have a name, description, and related employees.
   - Managers can assign employees to specific departments.
   - The **Departments Page** is **restricted to managers only**.
   - **Fully functional CRUD UI** with appropriate **snackbars** for success and error messages.

### 3. **Employee List Page**
   - Displays a list of all employees with essential information such as name, role, location, and department.
   - The list is dynamic and pulls real-time data from the backend via an API.
   - The **Employees Page** is **restricted to managers only**.
   - **Fully functional CRUD UI** for adding, updating, and deleting employees with **snackbars** to show success or error messages.

### 4. **Employee Details Page/Modal**
   - Both **employees and managers** can view employee details in a dedicated page or modal.
   - Displays detailed information about employees, including name, role, location, department, and other relevant data.

### 5. **Employee Filter Functionality**
   - A **filter button** allows users to filter employees by their **location** and **name**.
   - Filtering is done using an **API endpoint**, ensuring the filter logic is handled server-side for performance and consistency.
   - Options for ascending and descending sorting are also available.

### 6. **Department Assignment**
   - **Managers** can assign departments to employees.
   - Provides a user-friendly interface to select an employee and assign them to a department.
   - Ensures that department management is restricted to managers only.

## Technologies Used

- **React.js**: Used for building the user interface components.
- **Material-UI**: For beautiful, responsive design and pre-built components.
- **Axios**: For making HTTP requests to the backend.
- **React Router**: For seamless navigation between pages.
- **Redux** (Optional): For state management if required for larger state handling.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/employee-management-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd employee-management-frontend
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   This will start the app at `http://localhost:3000` by default.

## API Integration

The frontend communicates with the backend via API endpoints for:

- **User Authentication**: Signup, login, and session management.
- **Department Management**: CRUD operations for departments (only accessible by managers).
- **Employee Data**: Fetching employee data and filtering according to specified criteria.
- **Department Assignment**: Assigning employees to specific departments (manager role only).

Make sure the backend API is set up and running at the specified endpoint (`http://localhost:5000/api`) or the configured URL in your `.env` file.

## Usage

1. **Login Page**:
   - Users can log in with their credentials. Managers will have additional privileges on the dashboard.

2. **Dashboard**:
   - After logging in, users are redirected to their respective dashboard pages (Employee Dashboard or Manager Dashboard).
   - Managers will see additional options for managing departments and employees.

3. **Employee Management**:
   - Managers can perform CRUD operations on employees, assign departments, and filter employee data.

4. **Department Management**:
   - Managers can create, update, and delete departments.

## Access Control

- The **Employees Page** and **Departments Page** are **restricted to managers only**.
- **Managers** can access additional functionalities such as CRUD operations for departments and employees, as well as assigning departments to employees.
- **Employees** have limited access, mainly viewing their own data and profile.


## Future Enhancements

- Add **pagination** to employee lists for larger data sets.
- Improve **security** for handling authentication tokens and session management.
- Enhance **filtering** functionality with more parameters like role or department.

