import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Test Database Connection
async function testDBConnection() {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    client.release();
  } catch (err) {
    console.error("Database connection error", err);
  }
}

testDBConnection();

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
