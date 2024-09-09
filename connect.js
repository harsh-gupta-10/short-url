const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
async function connecttoMongoDB(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
// connect.js
module.exports = {
    connecttoMongoDB
};
