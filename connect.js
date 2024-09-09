const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

async function connecttoMongoDB(url) {
    return mongoose.connect(url);
}

// connect.js
module.exports = {
    connecttoMongoDB
};
