
export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Please use POST"
    });
  }

  const { name } = request.body || {};

  if (!name || typeof name !== "string") {
    return response.status(400).json({
      error: "Please provide your name"
    });
  }

  response.status(200).json({
    message: `Hello, ${name}! Your backend received your data.`,
    success: true
  });
}
