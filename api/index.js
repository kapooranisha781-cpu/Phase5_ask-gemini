import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Ask Gemini API is running!");
});

app.post("/ask", async (req, res) => {
    const { question } = req.body;

    if (!question || question.trim() === "") {
        return res.status(400).json({
            error: "Please enter a question."
        });
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question,
        });

        res.json({
            answer: response.text
        });

    } catch (error) {
        console.error("Gemini API Error:", error);

        res.status(500).json({
            error: "Something went wrong while getting the answer."
        });
    }
});

export default app;