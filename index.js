import express from "express";
import bodyParser from "body-parser";
import pool from "./db.js"; // Import the database connection
import "dotenv/config";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Express Setup
const app = express();
const port = process.env.PORT || 3000;

let quiz = [];
let totalCorrect = 0;
let currentQuestion = {};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Fetch Quiz Data from DB
async function fetchQuizData() {
  try {
    const result = await pool.query("SELECT * FROM capitals");
    quiz = result.rows;
  } catch (err) {
    console.error("Error fetching quiz data:", err);
  }
}

// Get Next Question
async function nextQuestion() {
  if (quiz.length === 0) {
    await fetc
