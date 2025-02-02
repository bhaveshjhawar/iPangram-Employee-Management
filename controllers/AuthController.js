const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { name, email, password, role, location } = req.body;
    try {
        const existingUser = await Employee.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Employee.create({ name, email, password: hashedPassword, role, location });

        res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Signup failed', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Employee.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Login failed', error });
    }
};
