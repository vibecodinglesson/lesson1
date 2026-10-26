
export default function handler(request, response) {
  response.status(200).json({
    message: "Hello from my Vercel backend!",
    lesson: "My first backend API",
    success: true
  });
}
