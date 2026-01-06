export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Jarvis, a helpful AI assistant." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
}
