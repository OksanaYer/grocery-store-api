import express from "express";
import router from "./routers/index.ts";
import dotenv from "dotenv";
import { connectDB } from "./db/index.ts";
dotenv.config();

const app = express();
const port = 3000;

// bodyparser
app.use(express.json());
app.use("/", router);


app.get("/", (req, res) => {
  console.log("Hello in consol");
  res.json({ message: "Hello from insomnia" });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});


// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "ok" });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// }); 