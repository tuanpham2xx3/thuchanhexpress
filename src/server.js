import express from "express";
import categoryRoute from "./routes/category.route.js";

const app = express();

const PORT = 3333;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
