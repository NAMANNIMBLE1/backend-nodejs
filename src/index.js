import { app, PORT } from "./app.js";

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: "success",
    headers: 'xyz'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
