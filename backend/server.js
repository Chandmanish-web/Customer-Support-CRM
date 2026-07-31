require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ticketRoutes = require("./routes/tickets");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "CRM API is running." });
});

// Simple health check for deployment platforms
app.get('/health', (req, res) => res.sendStatus(200));
app.use("/api/tickets", ticketRoutes);

if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI environment variable.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err && err.message ? err.message : err);
    process.exit(1);
  });
