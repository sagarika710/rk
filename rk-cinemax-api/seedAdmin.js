require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const createAdmin = async () => {
    try {
        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD;

        if (!password) {
            console.error('ADMIN_PASSWORD is required to seed the admin user.');
            process.exit(1);
        }

        // Check if admin already exists
        const exists = await User.findOne({ username });
        if (exists) {
            console.log('Admin user already exists.');
            process.exit();
        }

        // Create new admin
        const admin = new User({
            username,
            password
        });

        await admin.save();
        console.log('✅ Admin User Created Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

createAdmin();
