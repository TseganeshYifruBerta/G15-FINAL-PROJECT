// seed.js

const User = require('./user.model');
const bcrypt = require('bcrypt');

// Function to seed admin data
const seedAdminData = async () => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ where: { role: 'admin' } });
        const hashedPwd = await bcrypt.hash('admin_password' , 10)
        if (!adminExists) {
            // Create admin user
            await User.create({
                name: 'Admin',
                email: 'admin@gmail.com',
                userId: 'ATR/3333/33',
                password: hashedPwd, // Remember to hash passwords in a real application
                role: 'admin',
                status: 'active',
            });
            console.log('Admin data seeded successfully.');
        } else {
            console.log('Admin data already exists.');
        }
    } catch (error) {
        console.error('Error seeding admin data:', error);
    }
};

module.exports = seedAdminData;
