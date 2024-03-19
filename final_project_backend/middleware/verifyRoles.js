// const verifyRoles = (role) => {
//     return (req, res, next) => {
//         if (!req?.role) return res.sendStatus(401);
//         // const rolesArray = [...allowedRoles];
//         const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
//         if (!result) return res.sendStatus(401);
//         next();
//     }
// }

// module.exports = verifyRoles
const verifyRoles = (allowedRole) => {
    return (req, res, next) => {
        if (!req.user.role) {
            return res.sendStatus(401); // No role provided, unauthorized
        }

        if (req.user.role !== allowedRole) {
            return res.sendStatus(403); // User role does not match allowed role, forbidden
        }

        next(); // User role matches allowed role, proceed to the next middleware
    };
};



module.exports = verifyRoles
