import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy-initialization helper for Gemini SDK to prevent startup crashes if keys are absent
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing on the server secrets panel. Please specify it in the secrets menu.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

app.use(express.json());

// API: AI Royal Chef Consultant Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, chatHistory = [], activeCart = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message parameter is required" });
    }

    const ai = getGeminiClient();

    // Create system prompt to guide the model's persona, menu data knowledge, and CRO optimization
    const systemInstruction = `You are "Chef Royal", Burger King's high-converting Senior Culinary Advisor, UX/UI Guide, and Nutritional Consultant.
Your goal is to answer queries intelligently, suggest foods from our exclusive menu, guide custom burger ingredient combinations, and optimize conversions by motivating appetite!

Here is our CURRENT Burger King menu database:
1. Flame-Grilled Whopper® - $6.89, 660 kcal (Charcoal flame signature 100% beef, customizable)
2. Double Bacon King™ - $8.49, 1040 kcal (Double beef patties, savory smoked bacon, high calorie, thick-cut)
3. Royal Spicy Chicken Sandwich - $5.99, 590 kcal (Blazing crispy fillet, toasted potato bun)
4. BK Royale® Chicken Sandwich - $5.49, 510 kcal (Shredded lettuce, classic chicken on toasted bun)
5. Golden Thick-Cut French Fries - $3.29, 430 kcal (Classic golden salt crust)
6. Gourmet King Onion Rings - $3.49, 410 kcal (Gourmet slice, crispy golden batter coating)
7. Warm Chocolate Lava Cake - $4.49, 380 kcal (Molten premium fudge core dessert)
8. BK Royal Shake™ Oreo® Style - $4.19, 610 kcal (Vanilla soft serve, whipped cream, oreo pieces)

Custom burger ingredients (Customizer):
- Extra Flame-Grilled Patty ($1.99, 240 kcal)
- Melted American Cheese ($0.50, 70 kcal)
- Thick-Cut Smoked Bacon ($0.99, 90 kcal)
- Crispy Onion Rings Top ($0.75, 80 kcal)
- Signature Royal Flame Sauce ($0.25, 45 kcal)
- Zesty Honey Mustard ($0.25, 50 kcal)

Active Cart context from the user:
${JSON.stringify(activeCart)}

GUIDELINES FOR YOUR TONE & CONTENT:
- Use inviting, taste-inducing descriptors (e.g. "fire-grilled perfection", "smokey, savory bacon depths", "molten hot chocolate streams").
- Calculate calorie values precisely if they ask for dynamic combos (e.g., if we pair a Whopper with Fries).
- Cross-sell & Upsell! Suggest adding Onion Rings or the Warm Chocolate Lava Cake for sweet closure.
- Keep answers relatively short, professional, energetic, and extremely helpful.
- Respond with standard markdown content. Wrap suggestions in bold terms. Do not use complex system code logs.`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // We can seed the chat instance thread if there is historical content
    // Standard chats.create doesn't have a simple append, but we can send the context or chat history as a unified prompt or sequence
    let contextPrompt = "";
    if (chatHistory && chatHistory.length > 0) {
      contextPrompt += "Recent history for conversation continuity:\n";
      chatHistory.forEach((h: any) => {
        contextPrompt += `${h.sender === "user" ? "User" : "Chef Royal"}: ${h.text}\n`;
      });
      contextPrompt += `User's latest message: ${message}`;
    } else {
      contextPrompt = message;
    }

    const response = await chat.sendMessage({
      message: contextPrompt,
    });

    const reply = response.text || "I was dreaming of grilled Whoppers! What delicious choice can I guide you through today?";
    res.json({ reply });
  } catch (err: any) {
    console.error("Gemini Chat API Error:", err);
    res.status(500).json({
      error: "Our kitchen is smoking!",
      message: err.message || "An error occurred while connecting to the AI Chef.",
      isKeyMissing: !process.env.GEMINI_API_KEY,
    });
  }
});

// API: AI-Powered Search / Auto-Correction Mapping Endpoint
app.post("/api/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Search query requirement is empty." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are a semantic menu-matching router for Burger King's website search.
The user enters natural search terms (e.g., "high calorie dinner", "something sweet with chocolate", "crispy chicken deal", "flame flavor").
You must analyze the query and return a brief, friendly semantic mapping and suggest the exact item IDs from our menu that best match their hunger.

Our menu item IDs are:
1. "whopper-classic" (Flame-Grilled Whopper®)
2. "bacon-king" (Double Bacon King™)
3. "spicy-bk-chicken" (Royal Spicy Chicken Sandwich)
4. "crispy-chicken-royal" (BK Royale® Chicken Sandwich)
5. "french-fries-large" (Golden Thick-Cut French Fries)
6. "onion-rings-large" (Gourmet King Onion Rings)
7. "choc-lava-cake" (Warm Chocolate Lava Cake)
8. "oreo-shake" (BK Royal Shake™ Oreo® Style)

Return your response strictly as a JSON object of this structure:
{
  "matchedIds": ["id1", "id2"],
  "summary": "Short appetite-igniting explanation of why these match your request!"
}
Be concise. Do not prefix or suffix your response with anything except the raw JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Query: "${query}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err: any) {
    console.error("Gemini Search API Error:", err);
    // fallback clean response
    res.json({
      matchedIds: ["whopper-classic"],
      summary: "We matched you with our world-famous Whopper while our smart search filters heat up!",
    });
  }
});

// Configure Vite or Static Assets based on operational environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode: Inject Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static files from dist/
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Burger King Web Node] Running at http://localhost:${PORT}`);
    console.log(`[Gemini SDK Status] API Key present: ${!!process.env.GEMINI_API_KEY}`);
  });
}

startServer();
