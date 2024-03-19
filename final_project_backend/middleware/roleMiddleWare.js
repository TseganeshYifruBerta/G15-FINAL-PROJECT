// authMiddleware.js

// Middleware function to check if user is an admin
const isAdmin = async(req, res, next) => {
    if (req.user.role === 'admin') {
        next(); // User is an admin, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Access forbidden. Admin role required.' });
    }
};

// Middleware function to check if user is a teacher
const isTeacher = async(req, res, next) => {
    if (req.user.role === 'teacher') {
        next(); // User is a teacher, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Access forbidden. Teacher role required.' });
    }
};

// Middleware function to check if user is a student
const isStudent = async(req, res, next) => {
    if (req.user.role === 'student') {
        next(); // User is a student, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Access forbidden. Student role required.' });
    }
};

module.exports = { isAdmin, isTeacher, isStudent };
