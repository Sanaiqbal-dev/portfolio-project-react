const dotEnv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/route');
dotEnv.config();

const mongoString = process.env.DATABASE_URL;

console.log("Database URL is : ", mongoString);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/api/portfolio/experience', routes);

app.listen(3000, () => {
  console.log("Server started at 3000");
});
