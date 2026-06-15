// ServerJs is the entry point of the application
// It imports the Express app from app.js and starts the server on port 3000
// Important so We can run the tests without starting the server
import 'dotenv/config';
import app from "./app.js";

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


