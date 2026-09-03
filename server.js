import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public" });
});


app.post("/ask", async (req, res) => {

    const { question } = req.body;

    if (!question || question.trim() === "") {
        return res.status(400).json({
            error: "Please enter a question."
        });
    }

    try {

        console.log("Question received:", question);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question,
        });

        const answer = response.text;

        console.log("Gemini response received.");

        res.json({
            answer: answer
        });

    } catch (error) {

        console.error("Gemini API Error:", error);

        res.status(500).json({
            error: "Something went wrong while getting the answer."
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});







