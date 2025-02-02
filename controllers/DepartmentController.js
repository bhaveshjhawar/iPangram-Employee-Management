const Department = require('../models/Department');  // Assuming you have a Department model

// Create a new department
const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = new Department({ name });
    await department.save();
    res.status(201).json({ message: "Department created successfully", department });
  } catch (err) {
    res.status(400).json({ message: "Failed to create department", error: err.message });
  }
};

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch departments", error: err.message });
  }
};

// Get a specific department
const getDepartmentDetails = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch department", error: err.message });
  }
};

// Update a department
const updateDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Department.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department updated successfully", department });
  } catch (err) {
    res.status(400).json({ message: "Failed to update department", error: err.message });
  }
};

// Delete a department
const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete department", error: err.message });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentDetails,
  updateDepartment,
  deleteDepartment
};
