const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res
      .status(400)
      .json({ error: "Δεν μου έστειλες ερώτηση, καλέ!" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Απαντάς ως Madame Spill, ψευδοψυχολόγος με χιούμορ και φλυτζάνι. Μη σώσεις να γιατρέψεις κανέναν. Στόχος: σαρδόνιο χιούμορ με άρωμα κοινωνικής κατάρρευσης.",
        },
        { role: "user", content: question },
      ],
      temperature: 0.8,
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error("💥 GPT Error:", err.message);
    res
      .status(500)
      .json({
        error:
          "🧿 Η Madame έπαθε κρίση ταυτότητας. Ξαναδοκίμασε με άλλο φλιτζάνι.",
      });
  }
});

app.listen(port, () => {
  console.log(`🧿 Madame Spill ακούει στο http://localhost:${port}`);
});
