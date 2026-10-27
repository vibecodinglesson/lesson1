
export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Please use POST"
    });
  }

  const { question } = request.body || {};

  if (!question || typeof question !== "string") {
    return response.status(400).json({
      error: "Please enter a question"
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({
      error: "Gemini API key is not configured"
    });
  }

  try {
    const aiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: question }]
            }
          ]
        })
      }
    );

    const data = await aiResponse.json();

    if (!aiResponse.ok) {
      console.error("Gemini API error:", aiResponse.status, data);
      return response.status(502).json({
        error: "The AI service could not answer. Check model access and API limits."
      });
    }

    const answer =
      data.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("") || "No answer was returned.";

    return response.status(200).json({ answer });
  } catch (error) {
    console.error("Backend error:", error.message);
    return response.status(500).json({
      error: "Something went wrong while contacting the AI service."
    });
  }
}
