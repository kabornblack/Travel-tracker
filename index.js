import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
dotenv.config();

const app = express();
const port = 3000;
const password = process.env.PASSWORD;

console.log(process.env.PASSWORD);

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: password,
  port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


//GET HOME PAGE
app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
