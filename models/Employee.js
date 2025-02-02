const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['manager', 'employee'], required: true },
    location: { type: String, required: true },
    department: { type: String, ref: 'Department', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
