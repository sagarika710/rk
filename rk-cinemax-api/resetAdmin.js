require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('🔌 Connected to DB');
        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD;

        if (!password) {
            console.error('ADMIN_PASSWORD is required to reset the admin user.');
            process.exit(1);
        }

        // 1. Delete existing admin
        await User.deleteOne({ username });
        console.log('❌ Old admin deleted (if existed)');

        // 2. Create new admin
        const admin = new User({
            username,
            password
        });

        // 3. Save (This triggers the hashing middleware automatically)
        await admin.save();
        console.log('✅ New Admin Created:');
        console.log(`   Username: ${username}`);
        console.log('   Password: [from ADMIN_PASSWORD env]');

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
