const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./route/auth');
const connectMongoDB = require('./db/connectMongoDB');

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use('/api/auth', authRoutes);
app.use(express.json());

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}!`);
  connectMongoDB();
});