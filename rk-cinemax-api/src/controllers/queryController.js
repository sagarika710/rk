// You might want a simple Model for this, or just log it for now.
// For a production app, I recommend a simple 'Query' model.

const mongoose = require('mongoose');
const { sendQueryEmail } = require('../services/mailService');

const querySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});
const Query = mongoose.model('Query', querySchema);

exports.submitQuery = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await sendQueryEmail({ name, email, phone, subject, message });

        const query = await Query.create({ name, email, phone, subject, message });

        res.status(201).json({
            message: "Query received and emailed successfully.",
            recipientEmail: process.env.QUERY_RECEIVER_EMAIL || "radhakrishnacinemax@gmail.com",
            id: query._id
        });
    } catch (err) {
        const isMailConfigError = err.message === 'Email service is not configured';
        res.status(isMailConfigError ? 503 : 500).json({
            message: isMailConfigError
                ? "Email service is not configured yet. Please add SMTP settings."
                : "Failed to submit query"
        });
    }
};

exports.getQueries = async (req, res) => {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.json(queries);
};
