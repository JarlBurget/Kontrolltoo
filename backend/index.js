const fs = require("fs/promises");
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Read meals data from file
app.get("/meals", async (req, res) => {
  try {
    const mealsFilePath = path.join(__dirname, "data", "meals.json");
    const data = await fs.readFile(mealsFilePath, "utf8");
    res.json(JSON.parse(data)); // Send parsed JSON data
  } catch (error) {
    console.error("Error reading meals.json:", error);
    res.status(500).json({ message: "Failed to load meals data" });
  }
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
