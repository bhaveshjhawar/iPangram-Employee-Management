const express = require('express');
const { signup, login } = require('../controllers/AuthController');
const { 
    getAllEmployees, 
    getEmployeeDetails, 
    updateEmployee, 
    deleteEmployee, 
    assignDepartment,
    filterEmployeesByLocation,
    filterEmployeesByName
} = require('../controllers/EmployeeController');
const { 
    createDepartment, 
    getAllDepartments, 
    getDepartmentDetails, 
    updateDepartment, 
    deleteDepartment 
} = require('../controllers/DepartmentController');
const { isManager, isEmployee } = require('../middleware/Auth.middleware');

const router = express.Router();

// 🔹 Authentication Routes
router.post('/signup', signup);
router.post('/login', login);

// 🔹 Employee Routes
router.get('/employees', isManager, getAllEmployees);  // Only managers can fetch all employees
router.get('/employees/:id', isEmployee, getEmployeeDetails); // Employees can view their details
router.put('/employees/:id', isManager, updateEmployee); // Only managers can update employee details
router.delete('/employees/:id', isManager, deleteEmployee); // Only managers can delete employees

// 🔹 Department Routes
router.post('/departments', isManager, createDepartment); // Only managers can create a department
router.get('/departments', isManager, getAllDepartments); // Only managers can view all departments
router.get('/departments/:id', isManager, getDepartmentDetails); // Only managers can view a specific department
router.put('/departments/:id', isManager, updateDepartment); // Only managers can update a department
router.delete('/departments/:id', isManager, deleteDepartment); // Only managers can delete a department

// 🔹 Department Assignment
router.put('/employees/:id/department', isManager, assignDepartment);

// 🔹 Department Assignment
router.put('/employees/:id/department', isManager, assignDepartment);

// 🔹 Filtering Routes
router.get('/employees/filter/location', isManager, filterEmployeesByLocation);
router.get('/employees/filter/name', isManager, filterEmployeesByName);

module.exports = router;
