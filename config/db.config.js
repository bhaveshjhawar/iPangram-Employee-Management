const mongoose = require('mongoose');

const connectDB = () => {
    const URL = `mongodb://localhost:27017/employeeDB`;

    try {
        mongoose.connect(URL);
        console.log("=== Database Connected Successfully ===");
    } catch (error) {
        console.log("Error in Database Connection", error);
    }
};

module.exports = connectDB; // ✅ Exporting as a function directly
