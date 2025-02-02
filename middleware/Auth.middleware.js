const jwt = require('jsonwebtoken');

exports.isManager = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== 'manager') return res.status(403).json({ message: 'Access Denied' });
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// exports.isEmployee = (req, res, next) => {
//     try {
//         const token = req.header('Authorization').split(' ')[1];
//         jwt.verify(token, process.env.JWT_SECRET_KEY);
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };

exports.isEmployee = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // ✅ Allow access if the user is either an 'employee' or a 'manager'
        if (decoded.role !== 'employee' && decoded.role !== 'manager') {
            return res.status(403).json({ message: 'Access Denied' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
