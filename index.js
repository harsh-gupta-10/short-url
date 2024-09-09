const express = require('express');
const urlRoute = require('./routes/url');
const { connecttoMongoDB } = require('./connect');
const req = require('express/lib/request');
const URL = require('./models/url');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// MongoDB connection
connecttoMongoDB('mongodb://localhost:27017/short-url')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection failed', err));

// URL route
app.use(express.json());
app.use("/url", urlRoute);


app.get('/:shortid', async (req, res) => {
    const shortid = req.params.shortid;
    try {
        const result = await URL.findOneAndUpdate(
            { shortID: shortid },
            {
                $push: {
                    visitHistory: {
                        timestamp: new Date()  // Correctly invoking Date.now()
                    }
                }
            },
            { new: true } // To return the updated document
        );

        if (!result) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        // Redirect to the stored URL
        return res.redirect(result.redirectURL);
    } catch (error) {
        return res.status(500).json({ message: 'Error handling the redirect', error });
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});