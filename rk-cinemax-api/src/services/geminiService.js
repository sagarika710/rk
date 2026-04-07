// src/services/geminiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize API with Server-Side Environment Variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getChatResponse = async (userMessage, history) => {
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash", // Using the standard fast model
            systemInstruction: "You are the friendly and professional manager of Radhakrishna Cinemax. You help users with movie timings, ticket booking (via BookMyShow links), and facility information. Keep answers concise."
        });

        // Map frontend history format to Gemini format if necessary
        // Gemini expects: { role: 'user' | 'model', parts: [{ text: '...' }] }
        const chat = model.startChat({
            history: history || [], 
        });

        const result = await chat.sendMessage(userMessage);
        return result.response.text();

    } catch (error) {
        console.error("Gemini AI Error:", error);
        throw new Error("Failed to generate AI response");
    }
};

module.exports = { getChatResponse };
