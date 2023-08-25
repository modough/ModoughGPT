import express from 'express';
import cors from 'cors';
import fetch from "node-fetch";
import 'dotenv/config'


const app = express();
app.use(express.json());
app.use(cors());
app.post('/chat', async (req, res) => {
    const { prompt } = req.body;
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.SECRET_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: prompt
            }],
            max_tokens: 100
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data);
    } catch (error) {
        console.error(error)
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
