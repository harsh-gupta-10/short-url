const express = require('express');
const { connecttoMongoDB } = require('./connect').default;
const urlRoute = require('./routes/url');
const app = express();
const port = 3000;


connecttoMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection failed', err));
  

app.use("/url", urlRoute);
app.listen(port, () => console.log(`Server is running on port ${port}`));