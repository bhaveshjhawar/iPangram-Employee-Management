const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
};

exports.getEmployeeDetails = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching employee details', error });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Update failed', error });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Delete failed', error });
    }
};

exports.assignDepartment = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, { department: req.body.department }, { new: true });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Assignment failed', error });
    }
};

// 🔹 Filtering Employees
exports.filterEmployeesByLocation = async (req, res) => {
    try {
        const employees = await Employee.find().collation({ locale: 'en', strength: 2 }).sort({ location: 1 });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering employees', error });
    }
};

exports.filterEmployeesByName = async (req, res) => {
    const { order } = req.query; // Pass "asc" or "desc" in query
    try {
        const employees = await Employee.find().collation({ locale: 'en', strength: 2 }).sort({ name: order === 'desc' ? -1 : 1 });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering employees', error });
    }
};
